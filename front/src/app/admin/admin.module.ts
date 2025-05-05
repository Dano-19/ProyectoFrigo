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
<<<<<<< HEAD
import { ClienteComponent } from './cliente/cliente.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';

=======
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
>>>>>>> 16fd965c5c3b137dfc546bc5c0f9b2ac046f5011

@NgModule({
  declarations: [
    LayoutComponent,
<<<<<<< HEAD
    ClienteComponent
=======
    TecnicoComponent,
    UsuariosComponent
>>>>>>> 16fd965c5c3b137dfc546bc5c0f9b2ac046f5011
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
<<<<<<< HEAD
    InputTextModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    AccordionModule,
    DialogModule
=======
    HttpClientModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    //BrowserModule,
    //RouterModule,
    FormsModule,
    InventarioModule,
>>>>>>> 16fd965c5c3b137dfc546bc5c0f9b2ac046f5011
  ],
  providers: [
    CategoriaService,
    ProductoService
  ]
})
export class AdminModule { }
