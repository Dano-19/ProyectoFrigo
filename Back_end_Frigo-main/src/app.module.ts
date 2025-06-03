import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cliente } from './modules/cliente/entities/cliente.entity';
import { Usuario } from './modules/usuario/entities/usuario.entity';
import { Rol } from './modules/rol/entities/rol.entity';
import { Pedido } from './modules/pedido/entities/pedido.entity';
import { Tecnico } from './modules/tecnico/entities/tecnico.entity';
import { Ticket } from './modules/ticket/entities/ticket.entity';
import { Reporte } from './modules/reporte/entities/reporte.entity';
import { Material } from './modules/material/entities/material.entity';
import { MaterialesXReportes } from './modules/materialesxreportes/entities/materialesxreportes.entity';

import { ClienteModule } from './modules/cliente/cliente.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RolModule } from './modules/rol/rol.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { TecnicoModule } from './modules/tecnico/tecnico.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { ReporteModule } from './modules/reporte/reporte.module';
import { MaterialModule } from './modules/material/material.module';
import { MaterialesxreportesModule } from './modules/materialesxreportes/materialesxreportes.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'back1',
      synchronize: true, // solo para desarrollo
      autoLoadEntities: true,
      entities: [
        Cliente,
        Usuario,
        Rol,
        Pedido,
        Tecnico,
        Ticket,
        Reporte,
        Material,
        MaterialesXReportes,
      ],
    }),
    ClienteModule,
    UsuarioModule,
    RolModule,
    PedidoModule,
    TecnicoModule,
    TicketModule,
    ReporteModule,
    MaterialModule,
    MaterialesxreportesModule,
    AuthModule,
  ],
})
export class AppModule {}
