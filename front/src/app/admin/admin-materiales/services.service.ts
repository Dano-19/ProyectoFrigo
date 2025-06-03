import { Injectable } from '@angular/core';

export interface Material {
  id: string;
  nombre: string;
  descripcion: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private materiales: Material[] = [
    { id: '01', nombre: 'Plomo', descripcion: 'Metal pesado', stock: 100 },
    { id: '02', nombre: 'Aceite', descripcion: 'Lubricante de motor', stock: 50 }
  ];

  obtenerMateriales(): Material[] {
    return this.materiales;
  }

  agregarMaterial(material: Material): void {
    this.materiales.push(material);
  }

  // Opcional: eliminar, actualizar, etc.
  eliminarMaterial(id: string): void {
    this.materiales = this.materiales.filter(m => m.id !== id);
  }

  actualizarStock(id: string, nuevoStock: number): void {
    const mat = this.materiales.find(m => m.id === id);
    if (mat) {
      mat.stock = nuevoStock;
    }
  }
}
