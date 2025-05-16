import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reporte } from '../reporte/entities/cliente.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Reporte])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
