import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PedidoModule } from '../pedido/pedido.module';
import { TecnicoModule } from '../tecnico/tecnico.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    PedidoModule,   // ✅ Importa para usar PedidoService
    TecnicoModule,  // ✅ Importa para usar TecnicoService
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
