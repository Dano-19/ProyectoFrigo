
// src/modules/categoria/entities/categoria.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('categoria')  // Ajuste: usar el nombre real de tu tabla en singular
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  detalle: string | null;

  @OneToMany(() => Producto, producto => producto.categoria)
  productos: Producto[];
}

