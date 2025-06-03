import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Ticket } from '../ticket/entities/ticket.entity';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Reporte)
    private readonly reporteRepo: Repository<Reporte>,
  ) {}

  create(dto: CreateReporteDto): Promise<Reporte> {
    const reporte = this.reporteRepo.create({
      ...dto,
      ticket: { id_ticket: dto.id_ticket } as Ticket,
    });
    return this.reporteRepo.save(reporte);
  }

  findAll(): Promise<Reporte[]> {
    return this.reporteRepo.find({ relations: ['ticket', 'materiales'] });
  }

  async findOne(id: number): Promise<Reporte> {
    const reporte = await this.reporteRepo.findOne({
      where: { id_reporte: id },
      relations: ['ticket', 'materiales'],
    });
    if (!reporte) {
      throw new NotFoundException(`Reporte con id ${id} no encontrado`);
    }
    return reporte;
  }

  async update(id: number, dto: UpdateReporteDto): Promise<Reporte> {
    const reporte = await this.findOne(id);
    Object.assign(reporte, dto);
    if (dto.id_ticket) {
      reporte.ticket = { id_ticket: dto.id_ticket } as Ticket;
    }
    return this.reporteRepo.save(reporte);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reporteRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reporte con id ${id} no encontrado`);
    }
  }
}