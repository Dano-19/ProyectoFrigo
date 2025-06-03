import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserService }   from '../usuarios/user.service';

interface MenuItem {
  label: string;
  icon:  string;
  routerLink: any[];
  target?: string;
  allowedRoles: string[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  userRole = '';
  model: MenuItem[]         = [];
  filteredModel: MenuItem[] = [];

  constructor(
    public layoutService: LayoutService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (!user || !user.role) {
      console.error('No se encontró el rol en UserService.');
      return;
    }
    this.userRole = user.role;

    this.model = [
      { label: 'Inicio',     icon: 'pi pi-fw pi-home',    routerLink: ['/admin'], allowedRoles: ['client','technical','admin'] },
      { label: 'Materiales', icon: 'pi pi-fw pi-home',    routerLink: ['/admin/materiales'], allowedRoles: ['admin'] },
      { label: 'Lista Pedidos', icon: 'pi pi-fw pi-home',    routerLink: ['/admin/pedidos'], allowedRoles: ['admin'] },
      { label: 'Resportes', icon: 'pi pi-fw pi-home',    routerLink: ['/admin/reporte'], allowedRoles: ['admin'] },
      { label: 'Lista Clientes', icon: 'pi pi-fw pi-home',    routerLink: ['/admin/lista-cliente'], allowedRoles: ['admin'] },
      { label: 'Lista Tecnico', icon: 'pi pi-fw pi-home',    routerLink: ['/admin/lista-tecnico'], allowedRoles: ['admin'] },
      //{ label: 'Formulario', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/formulario'], allowedRoles: ['technical','admin'] },
      { label: 'Formulario Tecnico', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/formularioT'], allowedRoles: ['technical'] },
      { label: 'Lista de Materiales', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/lista-material'], allowedRoles: ['technical'] },
      { label: 'Tikect de Tecnico', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/ticket-tecnico'], allowedRoles: ['technical'] },
      { label: 'Tickets',    icon: 'pi pi-fw pi-ticket',  routerLink: ['/admin/tickets'],   target:'_blank', allowedRoles: ['admin'] },
      { label: 'Usuarios',   icon: 'pi pi-fw pi-user',    routerLink: ['/admin/usuarios'],  allowedRoles: ['admin'] },
      //{ label: 'Reportes',   icon: 'pi pi-fw pi-folder',   routerLink: ['/admin/reporte'],   target:'_blank', allowedRoles: ['admin'] },
      { label: 'Clientes',   icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/cliente'],   allowedRoles: ['client'] },
      //{label: 'Configuración', icon: 'pi pi-fw pi-cog', routerLink: ['/admin/producto'], allowedRoles: ['admin'] },
    ];

    // Filtramos los ítems permitidos para este rol
    this.filteredModel = this.model.filter(item =>
      item.allowedRoles.includes(this.userRole)
    );
  }
}
