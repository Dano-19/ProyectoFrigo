import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pedido')


@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

}
