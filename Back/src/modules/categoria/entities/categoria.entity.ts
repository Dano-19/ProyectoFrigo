import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { Reporte } from '../../reporte/entities/cliente.entity';
import { Ticket } from '../../tickets/entities/ticket.entity'; 


@Entity('Formulario')  // Ajuste: usar el nombre real de tu tabla en singular
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

    @Column({ nullable: true})
    fecha:Date

    @Column({ type: 'time', nullable: true })
    horaIngreso: string;

    @Column({ type: 'time', nullable: true })
    horaSalida: string;

    // Área: Usando tipo 'text' está bien si es un campo largo opcional
    @Column({ type: 'text', nullable: true })
    area: string;

    // Marca: Se usa 'varchar' con longitud definida (50 caracteres)
     @Column({ type: 'varchar', nullable: true })
    marca: string;

    // Modelo: Se usa 'varchar' con longitud definida (50 caracteres)
    @Column({ type: 'varchar', nullable: true })
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

    @OneToOne(() => Reporte, reporte => reporte.formulario)
    reporte: Reporte;

    @ManyToOne(() => Ticket, ticket => ticket.reportes, { eager: true })
    @JoinColumn({ name: 'ticket_id' })
    ticket: Ticket;
}

