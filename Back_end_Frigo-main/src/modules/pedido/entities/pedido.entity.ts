import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detalle: string;

  @Column()
  ciudad: string;

  @Column()
  callePrincipal: string;

  @Column()
  calleSecundaria: string;

  @Column()
  codigo_postal: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'cedula_cliente' })
  cliente: Cliente;
}
