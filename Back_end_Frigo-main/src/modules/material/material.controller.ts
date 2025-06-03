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
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(@Body() dto: CreateMaterialDto) {
    return this.materialService.create(dto);
  }

  @Get()
  findAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.remove(id);
  }
}