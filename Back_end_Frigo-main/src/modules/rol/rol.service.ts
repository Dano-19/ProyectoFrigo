import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  create(dto: CreateRolDto): Promise<Rol> {
    const rol = this.rolRepo.create({ nombre_rol: dto.nombre_rol });
    return this.rolRepo.save(rol);
  }

  findAll(): Promise<Rol[]> {
    return this.rolRepo.find({ relations: ['usuarios'] });
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepo.findOne({
      where: { id_rol: id },
      relations: ['usuarios'],
    });
    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }
    return rol;
  }

  async update(id: number, dto: UpdateRolDto): Promise<Rol> {
    const rol = await this.findOne(id);
    Object.assign(rol, dto);
    return this.rolRepo.save(rol);
  }

  async remove(id: number): Promise<void> {
    const result = await this.rolRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }
  }
}