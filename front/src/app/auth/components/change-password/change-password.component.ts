import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  changeForm!: FormGroup;
  token!: string;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Obtener el token de la URL
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    // Inicializar el formulario reactivo
    this.changeForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.changeForm.invalid) return;

    const { password, confirmPassword } = this.changeForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;

    // Llamada HTTP al backend para cambiar contraseña
    this.http.post('http://localhost:4000/auth/change-password', {
      token: this.token,
      newPassword: password
    }).subscribe({
      next: () => {
        this.successMessage = 'Contraseña actualizada correctamente. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error al cambiar la contraseña';
        this.loading = false;
      }
    });
  }
}
