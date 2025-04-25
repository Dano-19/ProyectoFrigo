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
    telefono: '',
    rol: '' // Nuevo campo para el rol
  };

  nameInvalid = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  // 👇 Función para evitar números en nombre
  soloLetras(event: KeyboardEvent): void {
    const input = event.key;
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;

    if (!regex.test(input)) {
      event.preventDefault();
      this.nameInvalid = true;
      this.messageService.add({
        severity: 'warn',
        summary: 'Solo letras',
        detail: 'El nombre no puede contener números ni símbolos.',
        life: 2500
      });

      setTimeout(() => {
        this.nameInvalid = false;
      }, 2000);
    }
  }

  onSubmit() {
    const email = this.formData.email;
    const password = this.formData.password;

    // Validación de nombre (por si omite la tecla)
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(this.formData.name)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Nombre inválido',
        detail: 'El nombre solo puede contener letras',
        life: 3000
      });
      return;
    }

    // Validación de correo
    if (!this.validEmail(email)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Correo inválido',
        detail: 'Solo se permiten correos con los dominios @tecnico.com, @admin.com o @cliente.com',
        life: 3000
      });
      return;
    }

    // Asignar el rol según el dominio del correo
    this.formData.rol = this.obtenerRolPorEmail(email);

    // Validación de contraseña
    if (!this.validPassword(password)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Contraseña inválida',
        detail: 'Debe tener mínimo 6 caracteres y al menos un carácter especial',
        life: 3000
      });
      return;
    }

    // Envío al backend
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
    const allowedDomains = ['@tecnico.com', '@admin.com', '@cliente.com'];
    return email.includes('@') && allowedDomains.some(domain => email.endsWith(domain));
  }

  validPassword(password: string): boolean {
    return password.length >= 6 && /[^A-Za-z0-9]/.test(password);
  }

  obtenerRolPorEmail(email: string): string {
    if (email.endsWith('@tecnico.com')) return 'tecnico';
    if (email.endsWith('@admin.com')) return 'admin';
    if (email.endsWith('@cliente.com')) return 'cliente';
    return 'desconocido';
  }
}
