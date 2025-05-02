import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tecnicos')
export class Tecnico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  especializacion: string;
}
