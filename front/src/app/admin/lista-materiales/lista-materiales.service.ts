// src/app/servicios/lista-materiales.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Material {
  id: string;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListaMaterialesService {
  constructor() {}

  obtenerMateriales(): Observable<Material[]> {
    const materiales: Material[] = [
      { id: '001', nombre: 'Tubería PVC 1"', descripcion: 'Tubería de PVC para agua potable' },
      { id: '002', nombre: 'Codo 90° PVC 1"', descripcion: 'Codo de 90 grados para unión de tubería' },
      { id: '003', nombre: 'Cinta teflón', descripcion: 'Cinta para sellar uniones de rosca' },
      { id: '004', nombre: 'Llave de paso 1"', descripcion: 'Llave para control de flujo de agua' },
      { id: '005', nombre: 'Soldadura para PVC', descripcion: 'Pegamento para unir piezas de PVC' },
      { id: '006', nombre: 'Reducción 1" a ½"', descripcion: 'Reducción para conectar tubería de diferentes diámetros' },
      { id: '007', nombre: 'Abrazadera metálica', descripcion: 'Abrazadera para sujetar tubería a muros' },
      { id: '008', nombre: 'Tubo flexible ½"', descripcion: 'Tubería flexible para instalaciones domésticas' },
      { id: '009', nombre: 'Filtro de agua', descripcion: 'Filtro para sistemas de purificación de agua' },
      { id: '010', nombre: 'Codo 45° PVC 1"', descripcion: 'Codo de 45 grados para redirección de tubería' },
      { id: '011', nombre: 'Tapón PVC 1"', descripcion: 'Tapón para cerrar extremos de tubería' },
      { id: '012', nombre: 'Union doble PVC 1"', descripcion: 'Conector para unir dos tramos de tubería' },
      { id: '013', nombre: 'Llave de nariz metálica', descripcion: 'Llave de salida para jardín o exteriores' },
      { id: '014', nombre: 'Adaptador hembra rosca 1"', descripcion: 'Adaptador para unir tubería a rosca metálica' },
      { id: '015', nombre: 'Soporte de PVC para tubo 1"', descripcion: 'Soporte para fijación de tubería en muros o techos' },
      { id: '016', nombre: 'Tanque de almacenamiento 500L', descripcion: 'Tanque de agua plástico de 500 litros para instalaciones domésticas' },
    ];

    return of(materiales);
  }
}
