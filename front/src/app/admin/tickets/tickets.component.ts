import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tickets.component.html'
})
export class TicketsComponent {
  ticket = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  constructor(private http: HttpClient) {}

  enviarTicket() {
    this.http.post('http://localhost:3000/tickets', this.ticket).subscribe({
      next: () => alert('✅ Ticket enviado con éxito'),
      error: err => {
        console.error(err);
        alert('❌ Error al enviar el ticket');
      }
    });
  }
}
