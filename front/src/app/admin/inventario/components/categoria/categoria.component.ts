import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

interface Categoria {
  id: number;
  nombre: string;
  detalle: string;
  fecha?: string;
  area?: string;
  marca?: string;
  modelo?: string;
  tipo?: string;
  descripcionTrabajo?: string;
  cantidad?: string;
  materiales?: string;
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService);

  categorias: Categoria[] = [];
  dialog_visible = false;
  categoria_id = -1;
  isSaving = false;

  categoriaForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    descripcionTrabajo: new FormControl('', Validators.required),
    cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    materiales: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.funListar().subscribe(
      res => { this.categorias = res as Categoria[]; },
      err => console.error(err)
    );
  }

  mostrarDialog() {
    this.dialog_visible = true;
  }

  guardarCategoria() {
    this.categoriaForm.markAllAsTouched();
    if (this.categoriaForm.invalid) {
      this.alerta('ERROR AL REGISTRAR', 'Por favor complete todos los campos', 'error');
      return;
    }

    const payload = { ...this.categoriaForm.value };
    if (payload.fecha) {
      payload.fecha = new Date(payload.fecha).toISOString();
    }

    this.isSaving = true;
    const request$ = this.categoria_id > 0
      ? this.categoriaService.funModificar(this.categoria_id, payload)
      : this.categoriaService.funGuardar(payload);

    request$.subscribe(
      () => {
        const titulo = this.categoria_id > 0 ? 'ACTUALIZADO' : 'REGISTRADO';
        const mensaje = this.categoria_id > 0
          ? 'La categoría se modificó con éxito!'
          : 'La categoría se creó con éxito!';
        this.isSaving = false;
        this.dialog_visible = false;
        this.getCategorias();
        this.alerta(titulo, mensaje, 'success');
        this.categoria_id = -1;
        this.categoriaForm.reset();
      },
      err => {
        console.error(err);
        const titulo = this.categoria_id > 0 ? 'ERROR AL ACTUALIZAR' : 'ERROR AL REGISTRAR';
        this.isSaving = false;
        this.alerta(titulo, 'Verifica los datos!', 'error');
      }
    );
  }

  editarCategoria(cat: Categoria) {
    this.dialog_visible = true;
    this.categoria_id = cat.id;
    this.categoriaForm.setValue({
      fecha: cat.fecha || '',
      area: cat.area || '',
      marca: cat.marca || '',
      modelo: cat.modelo || '',
      tipo: cat.tipo || '',
      descripcionTrabajo: cat.descripcionTrabajo || '',
      cantidad: cat.cantidad || '',
      materiales: cat.materiales || ''
    });
  }

  eliminarCategoria(cat: Categoria) {
    Swal.fire({
      title: '¿Está seguro de eliminar la categoría?',
      text: 'Una vez eliminada no se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          () => {
            this.alerta('ELIMINANDO!', 'Categoría eliminada', 'success');
            this.getCategorias();
            this.categoria_id = -1;
          },
          () => this.alerta('ERROR!', 'Error al intentar eliminar.', 'error')
        );
      }
    });
  }

  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title, text, icon });
  }

}
