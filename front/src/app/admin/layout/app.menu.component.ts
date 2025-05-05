import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { authGuard } from '../../guards/auth.guard';
import { UserService } from '../usuarios/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    user: any = null;
    constructor(
        public layoutService: LayoutService,
        private userService: UserService
    ) 
    { }

    ngOnInit() {
        const user = this.userService.getUser();
        console.log(user);
        if (user) {
            this.user = user; // <-- Guarda el objeto completo
        } else {
            console.error('No user data found in UserService.');
        }
    
        this.model = [
            { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/admin'], role: 'admin' },
            { label: 'Formulario', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/categoria'], role: 'admin' },
            { label: 'Listado de Formularios', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/producto'], role: 'admin' },
            { label: 'Tickets', icon: 'pi pi-fw pi-ticket', routerLink: ['/admin/tickets'], target: '_blank', role: 'admin' },
            { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/admin/usuarios'], role: 'admin' },
            { label: 'Reportes', icon: 'pi pi-fw pi-user', routerLink: ['/admin/reporte'], target: '_blank',  role: 'admin' },
            { label: 'Clientes', icon: 'pi pi-fw pi-user', routerLink: ['/admin/cliente'],  role: 'admin'},
        ];
    }
    
    }

