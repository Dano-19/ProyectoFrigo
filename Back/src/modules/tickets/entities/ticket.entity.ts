// src/modules/tickets/entities/ticket.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Reporte } from '../../reporte/entities/cliente.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  asunto: string;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @ManyToOne(() => User, (user) => user.tickets, { nullable: true })
  assignedTo: User;

  @OneToMany(() => Reporte, (reporte) => reporte.ticket)
  reportes: Reporte[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
