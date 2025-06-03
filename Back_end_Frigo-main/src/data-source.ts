import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Cliente } from './modules/cliente/entities/cliente.entity';
import { Usuario } from './modules/usuario/entities/usuario.entity';
import { Rol } from './modules/rol/entities/rol.entity';
import { Pedido } from './modules/pedido/entities/pedido.entity';
import { Tecnico } from './modules/tecnico/entities/tecnico.entity';
import { Ticket } from './modules/ticket/entities/ticket.entity';
import { Reporte } from './modules/reporte/entities/reporte.entity';
import { Material } from './modules/material/entities/material.entity';
import { MaterialesXReportes } from './modules/materialesxreportes/entities/materialesxreportes.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'back6',
  synchronize: true,
  logging: true,
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
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});
