import { Producto } from "../../producto/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    // Fecha: No necesita 'length' con tipo 'date'
    @Column({ type: 'date' })
    fecha: Date;

    // Área: Usando tipo 'text' está bien si es un campo largo opcional
    @Column({ type: 'text', nullable: true })
    area: string;

    // Marca: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', length: 50 })
    Marca: string;

    // Modelo: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', length: 50 })
    Modelo: string;

    // Tipo: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', length: 50 })
    Tipo: string;

    // Descripción de trabajo: Usamos 'text' para textos largos
    @Column({ type: 'text', nullable: true })
    descripcionTrabajo: string;

    // Cantidad: Cambiado a 'decimal' para permitir decimales
    @Column({ type: 'decimal', precision: 5, scale: 2 })  // 'precision' define la cantidad total de dígitos y 'scale' la cantidad de decimales
    Cantidad: number;

    // Material: 'text' es adecuado si la descripción puede ser larga, si no puedes usar 'varchar'
    @Column({ type: 'text', nullable: true })
    Material: string;

    // Acciones: Se usa 'varchar' con longitud definida
    @Column({ type: 'varchar', length: 50 })
    Acciones: string;

    // Relación uno a muchos con Producto
    @OneToMany(() => Producto, (prod) => prod.categoria)
    producto: Producto[];
}
