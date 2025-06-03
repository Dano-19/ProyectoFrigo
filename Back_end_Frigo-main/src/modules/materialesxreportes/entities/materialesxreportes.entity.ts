import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Material } from '../../material/entities/material.entity';
import { Reporte } from '../../reporte/entities/reporte.entity';

@Entity()
export class MaterialesXReportes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Material, (material) => material.reportes)
  @JoinColumn({ name: 'id_materiales' })
  material: Material;

  @ManyToOne(() => Reporte, (reporte) => reporte.materiales)
  @JoinColumn({ name: 'id_reporte' })
  reporte: Reporte;

  @Column()
  descripcion: string;
}
