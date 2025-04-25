import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // 🔁 redirección automática a /auth
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(adm => adm.AdminModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(aut => aut.AuthModule) }
];