import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { Pedido } from './entities/pedido.entity';
import { ClienteModule } from '../cliente/cliente.module'; // 👈 importar

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    ClienteModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService], // ✅ necesario para que otros módulos lo usen
})
export class PedidoModule {}
