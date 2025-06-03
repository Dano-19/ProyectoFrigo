import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ClienteService } from '../cliente/cliente.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    private readonly clienteService: ClienteService,
  ) {}

  async create(dto: CreatePedidoDto): Promise<Pedido> {
    const cliente = await this.clienteService.findOne(String(dto.cedula_cliente));
    const pedido = this.pedidoRepo.create({
      detalle: dto.detalle,
      ciudad: dto.ciudad,
      callePrincipal: dto.callePrincipal,
      calleSecundaria: dto.calleSecundaria,
      codigo_postal: String(dto.codigo_postal),
      cliente,
    });
    return this.pedidoRepo.save(pedido);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({ where: { id }, relations: ['cliente'] });
    if (!pedido) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    Object.assign(pedido, dto);

    if (dto.cedula_cliente) {
      const cliente = await this.clienteService.findOne(String(dto.cedula_cliente));
      pedido.cliente = cliente;
    }

    return this.pedidoRepo.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const result = await this.pedidoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
  }
}
