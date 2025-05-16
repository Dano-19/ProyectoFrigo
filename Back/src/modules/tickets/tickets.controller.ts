import { Controller, Post, Body, Delete, HttpCode, Param, Get, HttpStatus } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async crear(@Body() dto: CreateTicketDto) {
    const ticket = await this.ticketsService.create(dto);
    await this.ticketsService.enviarCorreo(dto);
    //console.log(dto.assignedToId)
    return ticket;
  }

  

  @Get()
  async findAll() {
    return this.ticketsService.findAll();
  }

  // GET /tickets/:id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  // DELETE /tickets/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.ticketsService.remove(id);
  }
}
