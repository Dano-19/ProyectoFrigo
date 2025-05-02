import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.scss']
})
export class TecnicoComponent {
  tecnicoForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.tecnicoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      especializacion: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.tecnicoForm.valid) {
      this.http.post('http://localhost:3000/tecnicos', this.tecnicoForm.value)
        .subscribe({
          next: () => alert('Técnico registrado con éxito'),
          error: () => alert('Error al registrar el técnico'),
        });
    }
  }
}
