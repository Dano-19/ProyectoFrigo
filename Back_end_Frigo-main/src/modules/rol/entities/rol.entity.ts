import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Role } from 'modules/common/enums/rol.enum';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

    @Column({type: 'enum', enum: Role, default: Role.CLIENT,})
  nombre_rol: Role;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
