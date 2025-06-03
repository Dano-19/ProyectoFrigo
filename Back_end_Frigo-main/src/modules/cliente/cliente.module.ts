import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    UsuarioModule,
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService], // ✅ necesario para que PedidoService lo use
})
export class ClienteModule {}
