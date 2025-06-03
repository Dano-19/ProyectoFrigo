import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { MaterialesXReportes } from '../../materialesxreportes/entities/materialesxreportes.entity';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id_materiales: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  stock: number;

  @OneToMany(() => MaterialesXReportes, (mxr) => mxr.material)
  reportes: MaterialesXReportes[];
}
