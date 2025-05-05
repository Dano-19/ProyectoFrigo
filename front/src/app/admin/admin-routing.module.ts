import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './inventario/components/categoria/categoria.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ProductoComponent } from './inventario/components/producto/producto.component';
import { NuevoPedidoComponent } from './pedido/components/nuevo-pedido/nuevo-pedido.component';
import { ListaPedidoComponent } from './pedido/components/lista-pedido/lista-pedido.component';
import { authGuard } from '../guards/auth.guard';
import { TicketsComponent } from './tickets/tickets.component'; // 👈 Importación del componente
import { ClienteComponent } from './cliente/cliente.component';
import { ReporteComponent } from './reporte/reporte.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "categoria",
        component: CategoriaComponent,
        canActivate: [authGuard("technical")]
      },
      {
        path: "producto",
        component: ProductoComponent,
        canActivate: [authGuard("technical")]
      },
      {
        path: "pedido/nuevo",
        component: NuevoPedidoComponent,
        canActivate: [authGuard("admin")]
      },
      {
        path: "pedido",
        component: ListaPedidoComponent,
        canActivate: [authGuard("admin")]
      },
      {
        path: "tickets", 
        component: TicketsComponent,
        canActivate: [authGuard("admin")]
      },
      {
        path: "cliente",
        component: ClienteComponent,
        canActivate: [authGuard("admin")]
      },
      {
        path: "reporte",
        component: ReporteComponent,
        canActivate: [authGuard("admin")]
      },
      {
        path: "usuarios",
        component: UsuariosComponent,
        canActivate: [authGuard("admin")]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
