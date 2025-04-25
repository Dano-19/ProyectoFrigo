// src/modules/tickets/tickets.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  crearTicket(@Body() ticket: any) {
    return this.ticketsService.enviarCorreo(ticket);
  }
}
