import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../rol/entities/rol.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [
    UsuarioService,
    TypeOrmModule, // 👈 exportamos también el repositorio
  ],
})
export class UsuarioModule {}
