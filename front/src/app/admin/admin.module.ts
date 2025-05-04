import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CategoriaService } from './inventario/services/categoria.service';
import { TableModule } from 'primeng/table';
import { InventarioModule } from './inventario/inventario.module';
import { ProductoService } from './inventario/services/producto.service';
import { PedidoModule } from './pedido/pedido.module';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { HttpClientModule }    from '@angular/common/http';
import { DialogModule }        from 'primeng/dialog';
import { InputTextModule }     from 'primeng/inputtext';
import { DropdownModule }      from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    TecnicoComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    TableModule,
    //InventarioModule,
    PedidoModule,
    MenuModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    //BrowserModule,
    //RouterModule,
    FormsModule,
    InventarioModule,
  ],
  providers: [
    CategoriaService,
    ProductoService
  ]
})
export class AdminModule { }
