// src/modules/tickets/tickets.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TicketsService {
  async enviarCorreo(ticket: any) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tucorreo@gmail.com',
        pass: 'tu_contraseña_o_app_password'
      }
    });

    const mailOptions = {
      from: ticket.correo,
      to: 'destinatario@correo.com',
      subject: `📩 Reclamo: ${ticket.asunto}`,
      text: `Nombre: ${ticket.nombre}\nCorreo: ${ticket.correo}\n\nMensaje:\n${ticket.mensaje}`
    };

    await transporter.sendMail(mailOptions);
    return { message: 'Ticket enviado con éxito' };
  }
}
