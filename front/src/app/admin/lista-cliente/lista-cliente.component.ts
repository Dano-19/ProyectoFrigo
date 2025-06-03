import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

interface Cliente {
  nombre: string;
  email: string;
  telefono: string;
  editando?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-lista-cliente',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule],
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent {
  // 👉 Columnas dinámicas para PrimeNG
  cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'email', header: 'email' },
    { field: 'telefono', header: 'Teléfono' }
  ];

  clientes: Cliente[] = [
    { nombre: 'Jose', email: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Mario', email: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Maria', email: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Su tía', email: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Hola', email: 'JJ@gmail.com', telefono: '09884587' }
  ];

  editar(cliente: Cliente) {
    cliente.editando = true;
  }

  guardar(cliente: Cliente) {
    cliente.editando = false;
  }

  eliminar(index: number) {
    this.clientes.splice(index, 1);
  }
}
