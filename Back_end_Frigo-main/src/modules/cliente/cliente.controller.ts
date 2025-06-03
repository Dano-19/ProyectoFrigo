import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.clienteService.findOne(cedula);
  }

  @Put(':cedula')
  update(
    @Param('cedula') cedula: string,
    @Body() dto: UpdateClienteDto,
  ) {
    return this.clienteService.update(cedula, dto);
  }

  @Delete(':cedula')
  remove(@Param('cedula') cedula: string) {
    return this.clienteService.remove(cedula);
  }
}
