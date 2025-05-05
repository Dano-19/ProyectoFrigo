import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

interface Categoria {
  id: number;
  fecha?: string;
  horaIngreso?: string;
  horaSalida?: string;
  area?: string;
  marca?: string;
  modelo?: string;
  tipo?: string;
  descripcion?: string;
  cantidad?: string;
  materiales?: string;
  acciones?: string;
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

  // 1) Incluimos los controles para horaIngreso y horaSalida
  categoriaForm = new FormGroup({
    fecha:        new FormControl('', Validators.required),
    horaIngreso:  new FormControl('', Validators.required),
    horaSalida:   new FormControl('', Validators.required),
    area:         new FormControl('', Validators.required),
    marca:        new FormControl('', Validators.required),
    modelo:       new FormControl('', Validators.required),
    tipo:         new FormControl('', Validators.required),
    descripcion:  new FormControl('', Validators.required),
    cantidad:     new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    materiales:   new FormControl('', Validators.required),
    acciones:     new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.funListar().subscribe(
      (res: any) => this.categorias = res,
      (err: any) => console.error(err)
    );
  }

  mostrarDialog() { this.categoria_id = -1;
    this.categoriaForm.reset();
    this.dialog_visible = true; }

  cerrarDialog(): void {
    this.dialog_visible = false;
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    }, 0);
  }

  guardarCategoria() {
    if (this.categoriaForm.invalid) {
      this.alerta('ERROR AL REGISTRAR', 'Complete todos los campos', 'error');
      return;
    }

    const data = { ...this.categoriaForm.value };

    // Validar y formatear fecha
    if (data.fecha) {
      const f = new Date(data.fecha);
      data.fecha = `${f.getFullYear()}-${String(f.getMonth()+1).padStart(2,'0')}-${String(f.getDate()).padStart(2,'0')}`;
    }

    this.isSaving = true;
    const request$ = this.categoria_id > 0
      ? this.categoriaService.funModificar(this.categoria_id, data)
      : this.categoriaService.funGuardar(data);

    request$.subscribe(
      () => {
        this.isSaving = false;
        this.cerrarDialog();
        this.getCategorias();
        this.alerta(this.categoria_id > 0 ? 'ACTUALIZADO' : 'REGISTRADO', '¡Operación exitosa!', 'success');
        this.categoria_id = -1;
        this.categoriaForm.reset();
      },
      () => {
        this.isSaving = false;
        this.alerta(this.categoria_id > 0 ? 'ERROR AL ACTUALIZAR' : 'ERROR AL REGISTRAR', 'Verifica los datos!', 'error');
      }
    );
  }

  editarCategoria(cat: Categoria) {
    this.dialog_visible = true;
    this.categoria_id = cat.id;

    // 2) Incluir horaIngreso y horaSalida en el setValue
    this.categoriaForm.setValue({
      fecha:        cat.fecha ? cat.fecha.split('T')[0] : '',
      horaIngreso:  cat.horaIngreso  || '',
      horaSalida:   cat.horaSalida   || '',
      area:         cat.area         || '',
      marca:        cat.marca        || '',
      modelo:       cat.modelo       || '',
      tipo:         cat.tipo         || '',
      descripcion:  cat.descripcion  || '',
      cantidad:     cat.cantidad     || '',
      materiales:   cat.materiales   || '',
      acciones:     cat.acciones     || ''
    });
  }

  eliminarCategoria(cat: Categoria) {
    Swal.fire({
      title: '¿Eliminar formulario?',
      text: '¡No podrás revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          () => { this.alerta('ELIMINADO', 'Formulario eliminado', 'success'); this.getCategorias(); this.categoria_id = -1; },
          () => this.alerta('ERROR', 'Error al eliminar', 'error')
        );
      }
    });
  }

  alerta(title: string, text: string, icon: 'success'|'error'|'info'|'question') {
    Swal.fire({ title, text, icon });
  }

  private loadImageAsDataUrl(url: string): Promise<string> {
    return fetch(url)
      .then(res => res.blob())
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  async generarPDFCategoria(cat: Categoria): Promise<void> {
    const doc = new jsPDF();

    try {
      const dataUrl = await this.loadImageAsDataUrl('assets/layout/images/Logo-FRIGO.jpg');
      doc.addImage(dataUrl, 'JPG', 127, 10, 70, 25);
    } catch (err) {
      console.warn('No se pudo cargar el logo desde assets:', err);
    }


    doc.setFontSize(18);
    doc.text("Formulario", 90, 10);

    doc.setFontSize(12);
    if (cat.fecha) {
      doc.text('Fecha: ' + cat.fecha, 10, 20);
    }

    doc.setFontSize(13);
    doc.text('Información:', 10, 40);

    const datos = [
      ['Hora Ingreso', cat.horaIngreso  || ''],
      ['Hora Salida',  cat.horaSalida   || ''],
      ['Área', cat.area || ''],
      ['Marca', cat.marca || ''],
      ['Modelo', cat.modelo || ''],
      ['Tipo', cat.tipo || ''],
      ['Descripción', cat.descripcion || ''],
      ['Cantidad', cat.cantidad || ''],
      ['Materiales', cat.materiales || ''],
      ['Acciones', cat.acciones || '']
    ];

    autotable(doc, {
      startY: 45,
      head: [['Campo', 'Valor']],
      body: datos,
      styles: {
        fontSize: 11,
        cellPadding: 4,
        fillColor: [255, 255, 255]
      },
      headStyles: {
        fillColor: [243, 146,   0], // naranja corporativo
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 245, 255]  // azul claro corporativo
      },
      tableLineWidth: 0.1,
      tableLineColor: [200, 200, 200]
    });

    doc.save(`categoria_${cat.id}.pdf`);
  }
}

