import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { Reporte, TecnicoService } from './tecnico.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    PanelModule
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  empresa = 'Empresa Kfc';
  ticketId = '001'; // ⚠️ Asegúrate de que luego sea un número válido
  estado: string = '';
  horaEntrada: string = '';
  horaSalida: string = '';
  descripcion: string = '';
  recomendacion: string = '';

  datosEquipo: { [key: string]: string } = {};

  materialesDisponibles = [
    { nombre: 'Plomo' },
    { nombre: 'Cobre' },
    { nombre: 'Silicona' },
    { nombre: 'Cable' }
  ];

  materialSeleccionado: any = null;
  materialesSeleccionados: { nombre: string; cantidad: number }[] = [];

  constructor(private tecnicoService: TecnicoService) {}

  ngOnInit() {}

  agregarMaterial() {
    if (this.materialSeleccionado) {
      const yaExiste = this.materialesSeleccionados.some(
        m => m.nombre === this.materialSeleccionado.nombre
      );
      if (!yaExiste) {
        this.materialesSeleccionados.push({
          nombre: this.materialSeleccionado.nombre,
          cantidad: 1
        });
      }
      this.materialSeleccionado = null;
    }
  }

  eliminarMaterial(nombre: string) {
    this.materialesSeleccionados = this.materialesSeleccionados.filter(m => m.nombre !== nombre);
  }

  guardarReporte() {
    if (!this.estado || !this.horaEntrada || !this.descripcion) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }

    const reporte: Reporte = {
      hora_entrada: this.horaEntrada,
      hora_salida: this.horaSalida,
      estado: this.estado,
      area: this.datosEquipo['area0'] || '',
      marca: this.datosEquipo['marca0'] || '',
      modelo: this.datosEquipo['modelo0'] || '',
      serie: this.datosEquipo['serie0'] || '',
      tipo: this.datosEquipo['tipo0'] || '',
      capacidad: this.datosEquipo['capacidad0'] || '',
      volt: this.datosEquipo['psi0'] || '',
      amp: this.datosEquipo['amp0'] || '',
      cantidad: this.materialesSeleccionados.reduce((acc, m) => acc + (m.cantidad || 0), 0),
      descripcion: this.descripcion,
      recomendacion: this.recomendacion,
      id_ticket: Number(this.ticketId) || 0
    };

    this.tecnicoService.create(reporte).subscribe({
     next: (res: Reporte) => {
  console.log('Reporte guardado:', res);
  alert('Reporte guardado correctamente');
},

      error: (err:any) => {
        console.error('Error al guardar:', err);
        alert('Ocurrió un error al guardar el reporte');
      }
    });
  }
}
