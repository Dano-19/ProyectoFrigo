// src/modules/producto/entities/producto.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
  import { Categoria } from '../../categoria/entities/categoria.entity';
  
  
  @Entity('productos')
  export class Producto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    precio: number;
  
    @Column('int', { default: 0 })
    stock: number;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string | null;
  
    
    @JoinColumn({ name: 'categoriaId' })
    categoria: Categoria | null;
  
    @Column({ type: 'int', nullable: true })
    categoriaId: number | null;
  
    
  }
  