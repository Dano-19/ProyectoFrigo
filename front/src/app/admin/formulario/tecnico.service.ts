import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Reporte {
  id?: number;
  hora_entrada: string;
  hora_salida: string;
  estado: string;
  area: string;
  marca: string;
  modelo: string;
  serie: string;
  tipo: string;
  capacidad: string;
  volt: string;
  amp: string;
  cantidad?: number;
  descripcion: string;
  recomendacion: string;
  id_ticket: number;
}

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  private readonly url = 'http://localhost:3000/reporte';

  constructor(private http: HttpClient) {}

  // Obtener todos los reportes
  getAll(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.url);
  }

  // Obtener un reporte por ID
  getById(id: number): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.url}/${id}`);
  }

  // Crear un nuevo reporte
  create(reporte: Reporte): Observable<Reporte> {
    return this.http.post<Reporte>(this.url, reporte);
  }

  // Actualizar un reporte existente
  update(id: number, reporte: Partial<Reporte>): Observable<Reporte> {
    return this.http.put<Reporte>(`${this.url}/${id}`, reporte);
  }

  // Eliminar un reporte
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
