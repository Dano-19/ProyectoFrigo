import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('categoria')  // Ajuste: usar el nombre real de tu tabla en singular
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

    @Column({ nullable: true})
    fecha:Date


    // Área: Usando tipo 'text' está bien si es un campo largo opcional
    @Column({ type: 'text', nullable: true })
    area: string;

    // Marca: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', length: 50 })
    marca: string;

    // Modelo: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', length: 50 })
    modelo: string;

    // Tipo: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', length: 50 })
    tipo: string;

    // Descripción de trabajo: Usamos 'text' para textos largos
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    // Cantidad: Cambiado a 'decimal' para permitir decimales
    @Column({ type: 'decimal', precision: 5, scale: 2 })  // 'precision' define la cantidad total de dígitos y 'scale' la cantidad de decimales
    cantidad: number;

    // Material: 'text' es adecuado si la descripción puede ser larga, si no puedes usar 'varchar'
    @Column({ type: 'text', nullable: true })
    materiales: string;

    // Acciones: Se usa 'varchar' con longitud definida
    @Column({ type: 'varchar', length: 50, nullable: true })
    acciones: string;

    // Relación uno a muchos con Producto
    @OneToMany(() => Producto, (prod) => prod.categoria)
    producto: Producto[];
}

