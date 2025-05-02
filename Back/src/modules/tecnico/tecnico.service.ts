import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tecnico } from './entities/tecnico.entity';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';

@Injectable()
export class TecnicoService {
  constructor(
    @InjectRepository(Tecnico)
    private readonly tecnicoRepository: Repository<Tecnico>,
  ) {}

  async create(createTecnicoDto: CreateTecnicoDto): Promise<Tecnico> {
    const tecnico = this.tecnicoRepository.create(createTecnicoDto);
    return this.tecnicoRepository.save(tecnico);
  }
}
