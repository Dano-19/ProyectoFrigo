import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  // Variables para mostrar mensajes de error
  errorLogin = false;
  notRegistered = false;

  // Lista de roles disponibles
  roles = [
    { label: 'Tecnico', value: 'tecnico' },
    { label: 'Cliente', value: 'cliente' }
  ];

  // Formulario con validación
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    rol: new FormControl(null, Validators.required)
  });

  // ✅ Validación personalizada de contraseña
  validPassword(password: string): boolean {
    return password.length >= 6 && /[^A-Za-z0-9]/.test(password);
  }

  // ✅ Ingreso al sistema
  funIngresar() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value || '';
    const rol = this.loginForm.get('rol')?.value;

    if (!email || !email.includes('@')) {
      alert('El correo debe contener un @ válido');
      return;
    }


    if (!this.validPassword(password)) {
      alert('La contraseña debe tener al menos 6 caracteres y un carácter especial.');
      return;
    }

    if (!rol) {
      alert('Debes seleccionar un rol.');
      return;
    }

    this.errorLogin = false;
    this.notRegistered = false;

    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem("access_token", res.token);

        this.messageService.add({
          severity: 'success',
          summary: `¡Bienvenido!`,
          detail: 'Redirigiendo a tu panel...',
          icon: 'pi pi-user',
          life: 2500
        });

        setTimeout(() => {
          this.router.navigate(["/admin"]); // aquí podrías condicionar según el rol
        }, 2500);
      },
      (error) => {
        console.log(error);
        if (error?.error?.message === 'Debes registrarte para poder ingresar') {
          this.notRegistered = true;

          setTimeout(() => {
            this.router.navigate(['auth/register']);
          }, 4000);
        } else {
          this.errorLogin = true;
        }
      }
    );
  }

  // ✅ Redirección al registro desde botón
  redirigirAlRegistro(): void {
    this.router.navigate(['auth/register']);
  }

  // ✅ Enviar contraseña por correo desde el botón "¿Olvidaste tu contraseña?"
  onForgotPassword(): void {
    const email = this.loginForm.get('email')?.value;

    if (!email || !this.loginForm.get('email')?.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo inválido',
        detail: 'Por favor ingresa un correo válido para recuperar la contraseña.',
        life: 3000
      });
      return;
    }

    this.authService.enviarPasswordPorCorreo(email).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Correo enviado',
          detail: `Tu contraseña fue enviada a ${email}`,
          life: 4000
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo enviar la contraseña. Inténtalo más tarde.',
          life: 4000
        });
      }
    });
  }
}
