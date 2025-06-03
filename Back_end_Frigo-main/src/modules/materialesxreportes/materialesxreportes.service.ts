import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialesXReportes } from './entities/materialesxreportes.entity';

@Injectable()
export class MaterialesxreportesService {
  constructor(
    @InjectRepository(MaterialesXReportes)
    private readonly repo: Repository<MaterialesXReportes>,
  ) {}

  create(data: Partial<MaterialesXReportes>) {
    const nuevo = this.repo.create(data);
    return this.repo.save(nuevo);
  }

  findAll() {
    return this.repo.find({ relations: ['material', 'reporte'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['material', 'reporte'] });
  }

  update(id: number, data: Partial<MaterialesXReportes>) {
    return this.repo.update(id, data);
  }

  async remove(id: number) {
    const encontrado = await this.repo.findOne({ where: { id } });
    return this.repo.remove(encontrado);
  }
}
