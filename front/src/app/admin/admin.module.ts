import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ClienteComponent } from './components/cliente/cliente.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LayoutComponent } from './layout/layout.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CategoriaService } from './inventario/services/categoria.service';
import { TableModule } from 'primeng/table';
import { InventarioModule } from './inventario/inventario.module';
import { ProductoService } from './inventario/services/producto.service';
import { PedidoModule } from './pedido/pedido.module';

// ✅ Importaciones necesarias para <p-menu>
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ClienteComponent,
    PerfilComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    TableModule,
    InventarioModule,
    PedidoModule,
    MenuModule,       // ✅ Importado aquí
    ButtonModule      // ✅ Botón con ícono para mostrar el menú
  ],
  providers: [
    CategoriaService,
    ProductoService
  ]
})
export class AdminModule { }
