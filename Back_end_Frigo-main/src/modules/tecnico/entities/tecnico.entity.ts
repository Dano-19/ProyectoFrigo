import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Tecnico {
  @PrimaryGeneratedColumn()
  id_tecnico: number;

  @Column()
  cedula: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @OneToMany(() => Ticket, (ticket) => ticket.tecnico)
  tickets: Ticket[];

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'cedula_usuario' })
  usuario: Usuario;
}
