
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteController } from './reporte.controller';
import { ReporteService } from './reporte.service';
import { Reporte } from './entities/reporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte])],
  controllers: [ReporteController],
  providers: [ReporteService],
})
export class ReporteModule {}
