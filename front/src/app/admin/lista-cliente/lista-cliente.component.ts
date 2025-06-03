import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

interface Cliente {
  nombre: string;
  correo: string;
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
    { field: 'correo', header: 'Correo' },
    { field: 'telefono', header: 'Teléfono' }
  ];

  clientes: Cliente[] = [
    { nombre: 'Jose', correo: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Mario', correo: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Maria', correo: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Su tía', correo: 'JJ@gmail.com', telefono: '09884587' },
    { nombre: 'Hola', correo: 'JJ@gmail.com', telefono: '09884587' }
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
