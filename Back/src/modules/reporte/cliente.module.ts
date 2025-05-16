import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Reporte } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
