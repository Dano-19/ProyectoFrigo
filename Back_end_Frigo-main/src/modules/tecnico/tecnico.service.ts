import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tecnico } from './entities/tecnico.entity';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';

@Injectable()
export class TecnicoService {
  constructor(
    @InjectRepository(Tecnico)
    private readonly tecnicoRepo: Repository<Tecnico>,
  ) {}

  create(dto: CreateTecnicoDto): Promise<Tecnico> {
    const tecnico = this.tecnicoRepo.create(dto);
    return this.tecnicoRepo.save(tecnico);
  }

  findAll(): Promise<Tecnico[]> {
    return this.tecnicoRepo.find({ relations: ['tickets'] });
  }

  async findOne(id: number): Promise<Tecnico> {
    const tecnico = await this.tecnicoRepo.findOne({
      where: { id_tecnico: id },
      relations: ['tickets'],
    });
    if (!tecnico) {
      throw new NotFoundException(`Técnico con id ${id} no encontrado`);
    }
    return tecnico;
  }

  async update(id: number, dto: UpdateTecnicoDto): Promise<Tecnico> {
    const tecnico = await this.findOne(id);
    Object.assign(tecnico, dto);
    return this.tecnicoRepo.save(tecnico);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tecnicoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Técnico con id ${id} no encontrado`);
    }
  }
}