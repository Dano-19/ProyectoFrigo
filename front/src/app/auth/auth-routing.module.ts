import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IdentidadComponent } from './components/identidad/identidad.component'; // Asegúrate de importar

const routes: Routes = [
  {
    path: '',
    redirectTo: 'identidad',
    pathMatch: 'full'
  },
  {
    path: 'identidad',
    component: IdentidadComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'identidad'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
