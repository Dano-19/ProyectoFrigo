import { Role } from "../../common/enums/rol.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Ticket } from '../../tickets/entities/ticket.entity'; // Adjust the path as needed
import { Reporte } from "../../reporte/entities/cliente.entity"; // Adjust the path as needed

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', length:50})
    name:string;

    @Column({type:'varchar', length:225, unique: true})
    email:string;

    @Column({type:'varchar', length:200})
    password:string;

    @Column({type: 'enum', enum: Role, default: Role.CLIENT,})
    role: Role

    @OneToMany(() => Ticket, (ticket) => ticket.assignedTo)
    tickets: Ticket[];

    @ManyToOne(() => Reporte, reporte => reporte.users)
    @JoinColumn({ name: 'reporte_id' })
    reporte: Reporte;

}
