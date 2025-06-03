import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClientController  } from '../Client/client.controller';
import { Reporte } from '../reporte/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte])],
  controllers: [ClientController ],
  providers: [ClienteService],
})
export class ClienteModule {}
