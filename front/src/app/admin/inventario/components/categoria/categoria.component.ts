import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

interface Categoria {
  id: number;
  fecha?: string;
  area?: string;
  marca?: string;
  modelo?: string;
  tipo?: string;
  capacidad?: string;
  refrig?: string;
  psi?: string;
  volts?: string;
  amp?: string;
  descripcion?: string;
  cantidad?: string;
  materiales?: string;
  recomendacion?: string;
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
  isSaving: boolean = false;  // Variable para controlar el estado de los botones

  categoriaForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    refrig: new FormControl('', Validators.required),
    psi: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    volts: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    amp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    descripcion: new FormControl('', Validators.required),
    cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    materiales: new FormControl('', Validators.required),
    recomendacion: new FormControl()
  });

  cat: Categoria | undefined;

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
    // Verifica si el formulario es inválido
    if (this.categoriaForm.invalid) {
      this.alerta('ERROR AL REGISTRAR', 'Por favor complete todos los campos', 'error');
      return;
    }
  
    const categoriaData = this.categoriaForm.value;
    console.log("Datos a enviar al backend:", categoriaData);  // Verifica los valores antes de enviarlos
  
    // Si la fecha es válida, la convertimos a formato ISO para el backend
    if (categoriaData['fecha']) {
      categoriaData['fecha'] = new Date(categoriaData['fecha']).toISOString();
    }
  
    // Iniciar el proceso de guardado
    this.isSaving = true;
  
    // Si la categoría tiene un ID mayor a 0, significa que estamos modificando una categoría existente
    if (this.categoria_id > 0) {
      this.categoriaService.funModificar(this.categoria_id, categoriaData).subscribe(
        (res: any) => {
          console.log("Respuesta de modificación:", res);
          this.isSaving = false;
          this.dialog_visible = false;
          this.getCategorias();  // Refrescar la lista de categorías después de modificar
          this.categoria_id = -1;  // Restablecer el ID
          this.alerta("ACTUALIZADO", "La categoría se modificó con éxito!", "success");
        },
        (error: any) => {
          console.error("Error al modificar:", error);
          this.isSaving = false;
          this.alerta("ERROR AL ACTUALIZAR", "Verifica los datos!", "error");
        }
      );
    } else {
      // Si no hay ID, significa que estamos creando una nueva categoría
      this.categoriaService.funGuardar(categoriaData).subscribe(
        (res: any) => {
          console.log("Respuesta de guardado:", res);
          this.isSaving = false;
          this.dialog_visible = false;
          this.getCategorias();  // Obtener lista actualizada después de guardar la nueva categoría
          this.alerta("REGISTRADO", "La categoría se creó con éxito!", "success");
        },
        (error: any) => {
          console.error("Error al guardar:", error);
          this.isSaving = false;
          this.alerta("ERROR AL REGISTRAR", "Verifica los datos!", "error");
        }
      );
    }
  
    // Resetear el formulario después de la operación
    this.categoriaForm.reset();
  }

  editarCategoria(cat: Categoria) {
    this.dialog_visible = true;
    this.categoria_id = cat.id;

    let fechaFormateada = '';
    if (cat.fecha) {
      const fecha = new Date(cat.fecha);
      const yyyy = fecha.getFullYear();
      const mm = String(fecha.getMonth() + 1).padStart(2, '0');
      const dd = String(fecha.getDate()).padStart(2, '0');
      fechaFormateada = `${yyyy}-${mm}-${dd}`;
    }

    this.categoriaForm.setValue({
      fecha: fechaFormateada,
      area: cat.area || '',
      marca: cat.marca || '',
      modelo: cat.modelo || '',
      tipo: cat.tipo || '',
      capacidad: cat.capacidad || '',
      refrig: cat.refrig || '',
      psi: cat.psi || '',
      volts: cat.volts || '',
      amp: cat.amp || '',
      descripcion: cat.descripcion || '',
      cantidad: cat.cantidad || '',
      materiales: cat.materiales || '',
      recomendacion: cat.recomendacion || ''
    });
  }

  eliminarCategoria(cat: Categoria) {
    Swal.fire({
      title: "¿Está seguro de eliminar la categoría?",
      text: "Una vez eliminada no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res: any) => {
            this.alerta("ELIMINANDO!", "Categoría eliminada", "success");
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
