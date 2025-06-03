import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,

    private readonly usuarioService: UsuarioService,
  ) {}

  async create(dto: CreateClienteDto): Promise<Cliente> {
    const usuario = await this.usuarioService.findOne(String(dto.cedula_usuario));
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const cliente = this.clienteRepo.create({
      cedula: String(dto.cedula),
      email: dto.email,
      telefono: String(dto.telefono),
      usuario,
    });
    return this.clienteRepo.save(cliente);
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepo.find({ relations: ['usuario', 'pedidos'] });
  }

  async findOne(cedula: string): Promise<Cliente> {
    const cliente = await this.clienteRepo.findOne({
      where: { cedula },
      relations: ['usuario', 'pedidos'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con cédula ${cedula} no encontrado`);
    }
    return cliente;
  }

  async update(cedula: string, dto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(cedula);
    Object.assign(cliente, dto);

    if (dto.cedula_usuario) {
      const usuario = await this.usuarioService.findOne(String(dto.cedula_usuario));
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      cliente.usuario = usuario;
    }

    return this.clienteRepo.save(cliente);
  }

  async remove(cedula: string): Promise<void> {
    const result = await this.clienteRepo.delete(cedula);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con cédula ${cedula} no encontrado`);
    }
  }
}
