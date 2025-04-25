import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
    // Validación del nombre: solo letras y espacios
    const nombreValido = /^[a-zA-ZÀ-ÿ\s]+$/.test(this.ticket.nombre.trim());
    if (!nombreValido) {
      alert('❗ El nombre solo puede contener letras. No se aceptan números ni símbolos.');
      return;
    }

    // Validación básica del correo
    if (!this.ticket.correo.includes('@')) {
      alert('📧 El correo debe ser válido (incluir @).');
      return;
    }

    // Validación de campos obligatorios
    if (!this.ticket.asunto || !this.ticket.mensaje) {
      alert('✍️ Todos los campos deben estar llenos.');
      return;
    }

    // Envío al backend
    this.http.post('http://localhost:3000/tickets', this.ticket).subscribe({
      next: () => {
        alert('✅ Ticket enviado con éxito');
        this.ticket = { nombre: '', correo: '', asunto: '', mensaje: '' }; // Limpiar formulario
      },
      error: err => {
        console.error(err);
        alert('❌ Error al enviar el ticket');
      }
    });
  }
}
