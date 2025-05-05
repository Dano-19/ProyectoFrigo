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
  isSaving: boolean = false;

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

    const categoriaData = this.categoriaForm.value;

    if (categoriaData['fecha']) {
      const fecha = new Date(categoriaData['fecha']);
      const yyyy = fecha.getFullYear();
      const mm = String(fecha.getMonth() + 1).padStart(2, '0');
      const dd = String(fecha.getDate()).padStart(2, '0');
      categoriaData['fecha'] = `${yyyy}-${mm}-${dd}`;
    }

    this.isSaving = true;

    if (this.categoria_id > 0) {
      this.categoriaService.funModificar(this.categoria_id, categoriaData).subscribe(
        (res: any) => {
          this.isSaving = false;
          this.dialog_visible = false;
          this.getCategorias();
          this.categoria_id = -1;
          this.alerta("ACTUALIZADO", "El formulario se modificó con éxito!", "success");
        },
        (error: any) => {
          this.isSaving = false;
          this.alerta("ERROR AL ACTUALIZAR", "Verifica los datos!", "error");
        }
      );
    } else {
      this.categoriaService.funGuardar(categoriaData).subscribe(
        (res: any) => {
          this.isSaving = false;
          this.dialog_visible = false;
          this.getCategorias();
          this.alerta("REGISTRADO", "El formulario se creó con éxito!", "success");
        },
        (error: any) => {
          this.isSaving = false;
          this.alerta("ERROR AL REGISTRAR", "Verifica los datos!", "error");
        }
      );
    }

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
      title: "¿Está seguro de eliminar el formulario?",
      text: "Una vez eliminado, no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res: any) => {
            this.alerta("ELIMINADO", "Formulario eliminado correctamente", "success");
            this.getCategorias();
            this.categoria_id = -1;
          },
          (error: any) => {
            this.alerta("ERROR!", "Error al intentar eliminar.", "error");
          }
        );
      }
    });
  }

  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title, text, icon });
  }

  generarPDFCategoria(cat: Categoria): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Detalle de Formulario", 10, 10);

    doc.setFontSize(12);
    if (cat.fecha) {
      doc.text('Fecha: ' + cat.fecha, 10, 40);
    }

    doc.setFontSize(13);
    doc.text('Información:', 10, 55);

    const datos = [
      ['Área', cat.area || ''],
      ['Marca', cat.marca || ''],
      ['Modelo', cat.modelo || ''],
      ['Tipo', cat.tipo || ''],
      ['Capacidad', cat.capacidad || ''],
      ['Refrigerante', cat.refrig || ''],
      ['PSI', cat.psi || ''],
      ['Volts', cat.volts || ''],
      ['AMP', cat.amp || ''],
      ['Descripción', cat.descripcion || ''],
      ['Cantidad', cat.cantidad || ''],
      ['Materiales', cat.materiales || ''],
      ['Recomendación', cat.recomendacion || '']
    ];

    autotable(doc, {
      head: [['Campo', 'Valor']],
      body: datos,
      startY: 60
    });

    doc.save(`categoria_${cat.id}.pdf`);
  }
}
