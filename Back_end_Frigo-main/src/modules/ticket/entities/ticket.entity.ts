import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Tecnico } from '../../tecnico/entities/tecnico.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Reporte } from '../../reporte/entities/reporte.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id_ticket: number;

  @Column({ type: 'date' })
  fecha_visita: string;

  @Column({ type: 'time' })
  hora_visita: string;

  @Column()
  detalle: string;

  @ManyToOne(() => Tecnico, (tecnico) => tecnico.tickets)
  @JoinColumn({ name: 'id_tecnico' })
  tecnico: Tecnico;

  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @Column()
  estado: string;

  @OneToOne(() => Reporte, (reporte) => reporte.ticket)
  reporte: Reporte;
}
