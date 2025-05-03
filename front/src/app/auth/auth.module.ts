import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';         // ✅ NUEVO
import { MessageService } from 'primeng/api';        // ✅ NUEVO

import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    PasswordModule,
    ToastModule,                // ✅ NUEVO: Toast para mensajes emergentes
    PrimengModule,
    FormsModule
  ],
  providers: [
    AuthService,
    MessageService             // ✅ NUEVO: MessageService para mostrar los mensajes de éxito/error
  ]
})
export class AuthModule { }
