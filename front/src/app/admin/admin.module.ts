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
import { ClienteComponent } from './cliente/cliente.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    LayoutComponent,
    ClienteComponent
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
    InputTextModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    AccordionModule,
    DialogModule
  ],
  providers: [
    CategoriaService,
    ProductoService
  ]
})
export class AdminModule { }
