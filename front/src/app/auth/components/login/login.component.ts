import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

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
        this.router.navigate(["/admin"]);
      },
      (error) => {
        console.log(error);
        if (error?.error?.message === 'Debes registrarte para poder ingresar') {
          this.notRegistered = true;

          // Redirección automática al registro después de 4 segundos
          setTimeout(() => {
            this.router.navigate(['/register']);
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
}
