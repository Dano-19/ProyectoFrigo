import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
  ) {}

  create(dto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepo.create(dto);
    return this.materialRepo.save(material);
  }

  findAll(): Promise<Material[]> {
    return this.materialRepo.find({ relations: ['reportes'] });
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialRepo.findOne({
      where: { id_materiales: id },
      relations: ['reportes'],
    });
    if (!material) {
      throw new NotFoundException(`Material con id ${id} no encontrado`);
    }
    return material;
  }

  async update(id: number, dto: UpdateMaterialDto): Promise<Material> {
    const material = await this.findOne(id);
    Object.assign(material, dto);
    return this.materialRepo.save(material);
  }

  async remove(id: number): Promise<void> {
    const result = await this.materialRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Material con id ${id} no encontrado`);
    }
  }
}