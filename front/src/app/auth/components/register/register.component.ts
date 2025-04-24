import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {
  formData = {
    name: '',
    apellido: '',
    username: '',
    email: '',
    password: '',
    telefono: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    // Validación personalizada de email
    if (!this.validEmail(this.formData.email)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Correo inválido',
        detail: 'El correo debe contener "@" y terminar en ".com"',
        life: 3000
      });
      return;
    }

    // Validación personalizada de contraseña
    if (!this.validPassword(this.formData.password)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Contraseña inválida',
        detail: 'Debe tener mínimo 6 caracteres y al menos un carácter especial',
        life: 3000
      });
      return;
    }

    // Llamada al backend
    this.http.post('http://localhost:3000/auth/register', this.formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Registro exitoso!',
          detail: 'Serás redirigido al login...',
          icon: 'pi pi-check-circle',
          life: 3000
        });

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al registrar usuario',
          life: 3000
        });
      }
    });
  }

  validEmail(email: string): boolean {
    return email.includes('@') && email.endsWith('.com');
  }

  validPassword(password: string): boolean {
    return password.length >= 6 && /[^A-Za-z0-9]/.test(password); // al menos un carácter especial
  }
}
