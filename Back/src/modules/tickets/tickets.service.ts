import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TicketsService {
  async enviarCorreo(ticket: { nombre: string; correo: string; asunto: string; mensaje: string }) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tucorreo@gmail.com',      // 🔒 Usa un correo real
        pass: 'tu_contraseña_app'        // 🔒 Contraseña de aplicación, no la normal
      }
    });

    const mailOptions = {
      from: ticket.correo,
      to: 'soporte@frigoservicios.com',
      subject: `🧾 Reclamo: ${ticket.asunto}`,
      text: `
        Nombre: ${ticket.nombre}
        Correo: ${ticket.correo}
        Asunto: ${ticket.asunto}
        Mensaje: ${ticket.mensaje}
      `
    };

    return await transporter.sendMail(mailOptions);
  }
}
