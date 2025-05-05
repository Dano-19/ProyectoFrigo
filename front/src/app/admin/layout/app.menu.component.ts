import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                ]
            },
            {
                items: [
                    { label: 'Formulario', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/categoria'] },
                    { label: 'Listado de Formularios', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/producto'] },

                ]
            },
            {
                items: [
                    /**{ label: 'Lista Pedidos', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/pedido'], badge: 'NEW' },
                    { label: 'Nuevo Pedido', icon: 'pi pi-fw pi-moon', routerLink: ['/admin/pedido/nuevo'], badge: 'NEW' },**/
                    { label: 'Tickets', icon: 'pi pi-fw pi-user', routerLink: ['/admin/tickets'], target: '_blank' },
                    { label: 'Reportes', icon: 'pi pi-fw pi-user', routerLink: ['/admin/reporte'], target: '_blank' }
                ]
            },
            {
                items: [
                    { label: 'Clientes', icon: 'pi pi-fw pi-user', routerLink: ['/admin/cliente'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/admin/usuarios'] },
                ]
            }
        ];
    }
}
