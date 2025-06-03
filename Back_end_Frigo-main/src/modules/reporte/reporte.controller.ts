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
import { ReporteService } from './reporte.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Post()
  create(@Body() dto: CreateReporteDto) {
    return this.reporteService.create(dto);
  }

  @Get()
  findAll() {
    return this.reporteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reporteService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReporteDto,
  ) {
    return this.reporteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reporteService.remove(id);
  }
}