import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lista-tecnico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './lista-tecnico.component.html',
  styleUrls: ['./lista-tecnico.component.scss']
})
export class ListaTecnicoComponent {
  tecnicos = [
    { cedula: '17518888', nombre: 'Juan', apellido: 'Guaman', correo: 'JJ.gmail.com', editable: false },
    { cedula: '12564987', nombre: 'Luis', apellido: 'Mora', correo: 'luism@gmail.com', editable: false },
    { cedula: '09876543', nombre: 'Ana', apellido: 'Reyes', correo: 'anita@correo.com', editable: false }
  ];

  editar(index: number) {
    this.tecnicos[index].editable = true;
  }

  guardar(index: number) {
    this.tecnicos[index].editable = false;
    // Aquí puedes hacer una llamada a un servicio para actualizar en backend
  }

  eliminar(index: number) {
    this.tecnicos.splice(index, 1);
  }
}

