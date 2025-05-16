import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, Index, OneToMany } from 'typeorm';
import { Cliente } from '../../Client/entities/client.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Ticket } from '../../tickets/entities/ticket.entity'; 
import { User } from '../../users/entities/user.entity';

@Entity('Reporte')
@Index('UQ_reporte_formulario', ['formulario'], { unique: true })
export class Reporte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  direccion: string;

  @Column()
  descripcion: string;

  @CreateDateColumn()
  creado_en: Date;

  @ManyToOne(() => Cliente, client => client.reportes, { eager: true })
  @JoinColumn({ name: 'client_id' })
  client: Cliente;

  @OneToOne(() => Categoria, formulario => formulario.reporte, { eager: true })
  @JoinColumn({ name: 'formulario_id' })
  formulario: Categoria;

  @ManyToOne(() => Ticket, ticket => ticket.reportes, { eager: true })
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @OneToMany(() => User, user => user.reporte)
  users: User[];
}
