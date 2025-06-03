import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TecnicoService } from './tecnico.service';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';

@Controller('tecnico')
export class TecnicoController {
  constructor(private readonly tecnicoService: TecnicoService) {}

  @Post()
  create(@Body() dto: CreateTecnicoDto) {
    return this.tecnicoService.create(dto);
  }

  @Get()
  findAll() {
    return this.tecnicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tecnicoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTecnicoDto,
  ) {
    return this.tecnicoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tecnicoService.remove(id);
  }
}