import { Controller, Post, Body } from '@nestjs/common';
import { TecnicoService } from './tecnico.service';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { Tecnico } from './entities/tecnico.entity';

@Controller('tecnicos')
export class TecnicoController {
  constructor(private readonly tecnicoService: TecnicoService) {}

  @Post()
  async create(@Body() createTecnicoDto: CreateTecnicoDto): Promise<Tecnico> {
    return this.tecnicoService.create(createTecnicoDto);
  }
}
