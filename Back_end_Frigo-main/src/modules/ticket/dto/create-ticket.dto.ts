// src/modules/ticket/dto/create-ticket.dto.ts
export class CreateTicketDto {
  /** Fecha de la visita (YYYY-MM-DD) */
  readonly fecha_visita: string;
  /** Hora de la visita (HH:MM:SS) */
  readonly hora_visita: string;
  
  readonly detalle: string;
  readonly id_tecnico: number;
  readonly id_pedido: number;
  readonly estado: string;
}
