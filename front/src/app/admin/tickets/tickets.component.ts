import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FormsModule,
             CommonModule,
              InputTextModule,
              InputTextareaModule,
              ButtonModule,
              CalendarModule
            ],
  templateUrl: './tickets.component.html'
})
export class TicketsComponent {
  ticket = {
    id: '',
    fechaVisita: '',
    horaVisita: '',
    cliente: '',
    estado: '',
    detalle: '',
    status: '',
  };

  // Define el email al que se enviará
  emailDestino = 'soporte@frigoservicios.com';

  constructor(private http: HttpClient) {}

  enviarTicket() {
    // Mostrar alerta con el email destino antes del envío
    alert(`✉️ El ticket será enviado a: ${this.emailDestino}`);

    // Envío HTTP al backend
    this.http.post('http://localhost:3000/tickets', this.ticket).subscribe({
      next: () => alert('✅ Ticket enviado con éxito'),
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al enviar el ticket');
      }
    });
  }
}