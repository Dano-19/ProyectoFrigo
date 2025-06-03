import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialesXReportes } from './entities/materialesxreportes.entity';
import { Material } from '../material/entities/material.entity';
import { Reporte } from '../reporte/entities/reporte.entity';
import { MaterialesxreportesService } from './materialesxreportes.service';
import { MaterialesxreportesController } from './materialesxreportes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialesXReportes, Material, Reporte])],
  controllers: [MaterialesxreportesController],
  providers: [MaterialesxreportesService],
})
export class MaterialesxreportesModule {}
