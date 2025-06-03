import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketService.create(dto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.remove(id);
  }
}