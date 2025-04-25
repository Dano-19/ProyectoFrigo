import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identidad',
  templateUrl: './identidad.component.html',
  styleUrls: ['./identidad.component.scss']
})
export class IdentidadComponent {
  constructor(private router: Router) {}

  redirigirRol(rol: string) {
    console.log(`Redirigiendo como: ${rol}`); // 👀 Muestra en consola
    this.router.navigate(['/auth/login'], { queryParams: { rol } });
  }
}
