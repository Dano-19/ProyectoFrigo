import { Inject, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoProductoDto } from './dto/pedido-producto.dto'; 
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Reporte } from '../reporte/entities/cliente.entity';


@Injectable()
export class PedidoService {
  constructor(
              @InjectRepository(Reporte)private clienteRepository: Repository<Reporte>,){}
              

  async create(createPedidoDto: CreatePedidoDto) {}

    
      


}
