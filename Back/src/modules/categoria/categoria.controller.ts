import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import path from 'path';

@UseGuards(JwtAuthGuard)
@ApiTags('categoria')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

<<<<<<< HEAD
  @Patch(':id')
  update(@Param('id') id: number,@Body()UpdateCategoriaDto:UpdateCategoriaDto) {
    return this.categoriaService.update(+id,UpdateCategoriaDto);
  }
=======
  /*@Patch(':id')
  update
  (@Param('id') id: number,@Body()UpdateCategoriaDto:UpdateCategoriaDto) {
    return this.categoriaService.update(+id,UpdateCategoriaDto);
  }*/

    @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, updateDto);
  }
    
>>>>>>> bfba1ddd6cd7d908dbfa4ad35094d0d0f5e50a63

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(+id);
  }



}
