import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { MaterialesXReportes } from '../../materialesxreportes/entities/materialesxreportes.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity()
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  //Talves nombre

  @Column({ type: 'time' })
  hora_entrada: string;

  @Column({ type: 'time' })
  hora_salida: string;

  @Column()
  estado: string;

  @Column()
  area: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  serie: string;

  @Column()
  tipo: string;

  @Column()
  capacidad: string;

  @Column()
  volt: string;

  @Column()
  amp: string;

  @Column()
  cantidad: number;

  @Column()
  descripcion: string;

  @Column()
  recomendacion: string;

  @OneToMany(() => MaterialesXReportes, (mxr) => mxr.reporte)
  materiales: MaterialesXReportes[];

  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'id_ticket' })
  ticket: Ticket;
}
