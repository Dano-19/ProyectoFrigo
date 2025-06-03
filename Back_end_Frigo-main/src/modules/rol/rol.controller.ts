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
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  create(@Body() dto: CreateRolDto) {
    return this.rolService.create(dto);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolDto,
  ) {
    return this.rolService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.remove(id);
  }
}
