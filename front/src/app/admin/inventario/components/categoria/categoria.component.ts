import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
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
  dialog_visible: boolean = false;
  categoria_id: number = -1;

  categoriaForm = new FormGroup({
    fecha: new FormControl(''),
    area: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    tipo: new FormControl(''),
    descripcionTrabajo: new FormControl(''),
    cantidad: new FormControl(''),
    materiales: new FormControl('')
  });

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.funListar().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  mostrarDialog() {
    this.dialog_visible = true;
  }

  guardarCategoria() {
    if (this.categoriaForm.invalid) {
      this.alerta("ERROR AL REGISTRAR", "Por favor complete todos los campos", "error");
      return;
    }

    if (this.categoria_id > 0) {
      this.categoriaService.funModificar(this.categoria_id, this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias(); // Refresh categories list after modification
          this.categoria_id = -1;
          this.alerta("ACTUALIZADO", "La categoría se modificó con éxito!", "success");
        },
        (error: any) => {
          this.alerta("ERROR AL ACTUALIZAR", "Verifica los datos!", "error");
        }
      );
    } else {
      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias(); // Fetch updated list after saving new category
          this.alerta("REGISTRADO", "La categoría se creó con éxito!", "success");
        },
        (error: any) => {
          this.alerta("ERROR AL REGISTRAR", "Verifica los datos!", "error");
        }
      );
    }

    // Reset form after submission
    this.categoriaForm.reset();
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
      title: "¿Está seguro de eliminar la categoría?",
      text: "Una vez eliminada no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res: any) => {
            this.alerta("ELIMINANDO!", "Categoría eliminada", "success");
            this.getCategorias();
            this.categoria_id = -1;
          },
          (error: any) => {
            this.alerta("ERROR!", "Error al intentar eliminar. ", "error");
          }
        );
      }
    });
  }

  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title, text, icon });
  }
}
