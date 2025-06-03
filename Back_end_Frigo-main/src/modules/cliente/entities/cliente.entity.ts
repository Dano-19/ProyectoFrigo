import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity()
export class Cliente {
  @PrimaryColumn()
  cedula: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.clientes)
  @JoinColumn({ name: 'cedula_usuario' })
  usuario: Usuario;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
