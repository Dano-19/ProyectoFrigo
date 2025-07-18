import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Rol } from '../rol/entities/rol.entity';
import { Role } from 'modules/common/enums/rol.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  async create(dto: CreateUsuarioDto) {
    let rol = await this.rolRepo.findOne({ where: { id_rol: dto.id_rol } });
    if (!rol) {
      rol = await this.rolRepo.findOne({
        where: { nombre_rol: Role.CLIENT },
      });
    }

    const usuario = this.usuarioRepo.create({
      cedula: String(dto.cedula),
      nombre: dto.nombre,
      email: dto.email,
      telefono: String(dto.telefono),
      password: dto.password,
      rol,
    });
    console.log('Usuario creado:', usuario);
    return this.usuarioRepo.save(usuario);
  }

  findAll() {
    return this.usuarioRepo.find({ relations: ['rol'] });
  }

  findOne(cedula: string) {
    return this.usuarioRepo.findOne({ where: { cedula }, relations: ['rol'] });
  }

  async update(cedula: string, dto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepo.findOne({ where: { cedula } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    if (dto.id_rol) {
      const rol = await this.rolRepo.findOne({ where: { id_rol: dto.id_rol } });
      if (!rol) throw new NotFoundException('Rol no encontrado');
      usuario.rol = rol;
    }

    return this.usuarioRepo.save({ ...usuario, ...dto });
  }

  async remove(cedula: string) {
    const usuario = await this.usuarioRepo.findOne({ where: { cedula } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return this.usuarioRepo.remove(usuario);
  }

  async findByemail(email: string) {
    return this.usuarioRepo.findOne({
      where: { email },
      relations: ['rol'],
    });
  }
}
