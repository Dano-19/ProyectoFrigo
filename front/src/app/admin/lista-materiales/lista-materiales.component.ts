import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ListaMaterialesService, Material } from './lista-materiales.service';


@Component({
  selector: 'app-lista-materiales',
  standalone: true,
  imports: [TableModule, CommonModule, PanelModule],
  templateUrl: './lista-materiales.component.html',
  styleUrl: './lista-materiales.component.scss',
})
export class ListaMaterialesComponent implements OnInit {
  customers: Material[] = [];

  constructor(private materialesService: ListaMaterialesService) {}

  ngOnInit(): void {
    this.materialesService.obtenerMateriales().subscribe((materiales) => {
      this.customers = materiales;
    });
  }
}
