import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CategoriaService } from './inventario/services/categoria.service';
import { ProductoService } from './inventario/services/producto.service';

import { InventarioModule } from './inventario/inventario.module';
import { PedidoModule } from './pedido/pedido.module';

import { ClienteComponent } from './cliente/cliente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG modules (una sola vez cada uno)
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// ❌ No pongas BrowserModule ni RouterModule aquí
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LayoutComponent,
    ClienteComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    InventarioModule,
    PedidoModule,

    // Angular
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // PrimeNG
    TableModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    AccordionModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  providers: [
    CategoriaService,
    ProductoService
  ]
})
export class AdminModule { }
