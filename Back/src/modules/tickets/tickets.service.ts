import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  async enviarTicketPorCorreo(data: CreateTicketDto) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'TUCORREO@gmail.com',
        pass: 'TU_APP_PASSWORD' // usa contraseña de aplicación, no tu clave normal
      }
    });

    await transporter.sendMail({
      from: `"Ticket de Reclamo" <${data.correo}>`,
      to: 'soporte@tusitio.com', // ✅ aquí llega el reclamo
      subject: `Nuevo Reclamo: ${data.asunto}`,
      text: `
Nombre: ${data.nombre}
Correo: ${data.correo}
Asunto: ${data.asunto}

Mensaje:
${data.mensaje}
      `
    });

    return { mensaje: '✅ Ticket enviado correctamente por correo' };
  }
}
