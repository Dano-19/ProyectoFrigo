import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PedidoService } from '../pedido/pedido.service';
import { TecnicoService } from '../tecnico/tecnico.service';
import { Tecnico } from '../tecnico/entities/tecnico.entity';
import { Pedido } from '../pedido/entities/pedido.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    private readonly pedidoService: PedidoService,
    private readonly tecnicoService: TecnicoService,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const pedido = await this.pedidoService.findOne(dto.id_pedido);
    const tecnico = await this.tecnicoService.findOne(dto.id_tecnico);
    const ticket = this.ticketRepo.create({
      fecha_visita: dto.fecha_visita,
      hora_visita: dto.hora_visita,
      detalle: dto.detalle,
      tecnico: tecnico as Tecnico,
      pedido: pedido as Pedido,
      estado: dto.estado,
    });
    return this.ticketRepo.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({ relations: ['tecnico', 'pedido', 'reporte'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id_ticket: id },
      relations: ['tecnico', 'pedido', 'reporte'],
    });
    if (!ticket) throw new NotFoundException(`Ticket ${id} no encontrado`);
    return ticket;
  }

  async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    // Verificar existencia
    const existing = await this.ticketRepo.findOneBy({ id_ticket: id });
    if (!existing) {
      throw new NotFoundException(`Ticket ${id} no encontrado`);
    }

    // Filtrar campos definidos
    const valuesToUpdate = Object.entries(dto)
      .filter(([_, v]) => v !== undefined)
      .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});

    if (Object.keys(valuesToUpdate).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    // Si cambian claves foráneas, resolverlas primero
    if (dto.id_pedido) {
      const pedido = await this.pedidoService.findOne(dto.id_pedido);
      valuesToUpdate['pedido'] = pedido;
    }
    if (dto.id_tecnico) {
      const tecnico = await this.tecnicoService.findOne(dto.id_tecnico);
      valuesToUpdate['tecnico'] = tecnico;
    }

    // Ejecutar actualización
    await this.ticketRepo
      .createQueryBuilder()
      .update(Ticket)
      .set(valuesToUpdate)
      .where('id_ticket = :id', { id })
      .execute();

    return this.ticketRepo.findOne({
      where: { id_ticket: id },
      relations: ['tecnico', 'pedido', 'reporte'],
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.ticketRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Ticket ${id} no encontrado`);
  }
}
