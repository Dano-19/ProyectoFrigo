import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-ticket-tecnico',
  standalone: true, 
  imports: [
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    PanelModule,
    CommonModule
  ],
  templateUrl: './ticket-tecnico.component.html', 
 
})
export class ticket_tecnicoComponent implements OnInit {
  ticketId = '001';
  fecha = '30 de Mayo 2025'
  hora_visita= '08:00 am';
  estado = 'En curso';
  tecnicoId = 'Paúl Carrillo';
  descripcion = 'Descripción del problema';

  ngOnInit() {}

  AceptarTicket() {
    const reporte = {
      ticketId: this.ticketId,
      fecha: this.fecha,
      hora_visita: this.hora_visita,
      estado: this.estado,
      tecnicoId: this.tecnicoId,
      descripcion: this.descripcion,
    };
    console.log('Aceptar', reporte);
  }
}
