import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TicketsService {
   constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /** Crea y guarda el ticket en BD */
  async create(dto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepo.create({
      nombre: dto.nombre,
      correo: dto.correo,
      asunto: dto.asunto,
      mensaje: dto.mensaje,
      status: dto.status 
      

    });

    if (dto.assignedToId) {
      const user = await this.userRepo.findOne({ where: { id: dto.assignedToId } });
      if (!user) {
        throw new NotFoundException(`Usuario con id ${dto.assignedToId} no existe`);
      }
      ticket.assignedTo = user;
    }

    return this.ticketRepo.save(ticket);
  }


  async enviarCorreo(ticket: { nombre: string; correo: string; asunto: string; mensaje: string }) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailToClient = {
        from: `"Frigo Soporte" <${process.env.MAIL_USER}>`,
        to: ticket.correo,
        subject: `📨 Hemos recibido tu ticket: ${ticket.asunto}`,
        text: `
Hola ${ticket.nombre},

Gracias por contactarnos. Hemos recibido tu mensaje:

"${ticket.mensaje}"

Nos pondremos en contacto contigo lo antes posible.

Saludos,
FrigoServicios
        `,
      };

      const mailToSupport = {
        from: `"Frigo Sistema" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        subject: `🆕 Nuevo ticket recibido de ${ticket.nombre}`,
        text: `
Se ha generado un nuevo ticket:

Nombre: ${ticket.nombre}
Correo: ${ticket.correo}
Asunto: ${ticket.asunto}
Mensaje:
${ticket.mensaje}

Generado automáticamente desde el sistema.
        `,
      };

      await Promise.all([
        transporter.sendMail(mailToClient),
        transporter.sendMail(mailToSupport),
      ]);

      console.log(`✅ Correos enviados correctamente a:
- Cliente: ${ticket.correo}
- Soporte: ${process.env.MAIL_USER}`);

      return { message: 'Correos enviados al cliente y al soporte' };
    } catch (error) {
      console.error('❌ Error al enviar correos:', error);
      throw new Error('Error al enviar correos');
    }
  }

  /** Lista todos los tickets */
  async findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({ relations: ['assignedTo', 'reportes'] });
  }

  /** Busca un ticket por ID */
  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['assignedTo', 'reportes'],
    });
    if (!ticket) throw new NotFoundException(`Ticket ${id} no encontrado`);
    return ticket;
  }

  /** Borra un ticket */
  async remove(id: string): Promise<void> {
    const result = await this.ticketRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Ticket ${id} no encontrado`);
  }
  


}

