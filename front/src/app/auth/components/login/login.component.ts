import { HttpClient } from '@angular/common/http';
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

  // Formulario con validación
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  funIngresar() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value || '';

    // Validación de formato de correo
    if (!email || !email.includes('@')) {
      alert('El correo debe contener un @ válido');
      return;
    }

    // Validación de contraseña con carácter especial
    if (!this.validPassword(password)) {
      alert('La contraseña debe tener al menos 6 caracteres y un carácter especial.');
      return;
    }

    // Reinicia los estados de error
    this.errorLogin = false;
    this.notRegistered = false;

    // Lógica de login
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem("access_token", res.token);

        this.messageService.add({
          severity: 'success',
          summary: `¡Bienvenido, ${res.user?.username || 'usuario'}!`,
          detail: 'Redirigiendo a tu panel...',
          icon: 'pi pi-user',
          life: 2500
        });

        setTimeout(() => {
          this.router.navigate(["/admin"]);
        }, 2500);
      },
      (error) => {
        console.log(error);
        if (error?.error?.message === 'Debes registrarte para poder ingresar') {
          this.notRegistered = true;

          // Redirección automática al registro después de 4 segundos
          setTimeout(() => {
            this.router.navigate(['auth/register']);
          }, 4000);
        } else {
          this.errorLogin = true;
        }
      }
    );
  }

  validPassword(password: string): boolean {
    return password.length >= 6 && /[^A-Za-z0-9]/.test(password);
  }

  // ✅ Redirección directa al registro desde botón
  redirigirAlRegistro(): void {
    this.router.navigate(['auth/register']);
  }
}
