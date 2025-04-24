import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CategoriaComponent } from './inventario/components/categoria/categoria.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ProductoComponent } from './inventario/components/producto/producto.component';
import { NuevoPedidoComponent } from './pedido/components/nuevo-pedido/nuevo-pedido.component';
import { ListaPedidoComponent } from './pedido/components/lista-pedido/lista-pedido.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    component:AppLayoutComponent,
    children:[
      {
        path:"perfil",
        component:PerfilComponent,
        canActivate: [authGuard]
      },
      {
        path:"categoria",
        component:CategoriaComponent,
        canActivate: [authGuard]
      },

      {
        path:"producto",
        component:ProductoComponent,
        canActivate: [authGuard]
      },
      {
        path:"pedido/nuevo",
        component:NuevoPedidoComponent,
        canActivate: [authGuard]
      },
      {
        path:"pedido",
        component:ListaPedidoComponent,
        canActivate: [authGuard]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
