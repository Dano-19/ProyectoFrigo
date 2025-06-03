import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent {
  clienteForm: FormGroup;

  visible: boolean = false;
  showDialog() {
        this.visible = true;
    }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.clienteForm = this.fb.group({
      codifoPostal: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.email]],
      ciudad: [''],
      callePrincipal: ['', Validators.required],
      calleSecundaria: ['', Validators.required],
    });
  }

  guardar() {
    console.log('Estado del formulario:', this.clienteForm.status);
    console.log('Datos:', this.clienteForm.value);

    if (this.clienteForm.valid) {
      const datos = this.clienteForm.value;

      this.http.post('http://localhost:3000/clientes', datos)
        .subscribe({
          next: () => alert('Datos guardados con éxito'),
          error: () => alert('Error al guardar los datos'),
        });
    } else {
      alert('Por favor llena todos los campos obligatorios');
    }
  }
}
