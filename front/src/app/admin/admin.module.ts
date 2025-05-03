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

@NgModule({
  declarations: [
    LayoutComponent,
    TecnicoComponent
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
    ReactiveFormsModule
  ],
  providers: [
    CategoriaService,
    ProductoService
  ]
})
export class AdminModule { }
