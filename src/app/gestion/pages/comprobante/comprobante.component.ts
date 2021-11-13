import { Component, OnInit } from '@angular/core';
import { Comprobante } from './comprobante.interface';
import { ComprobanteService } from './comprobante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styles: [`
    table { width: 100%; }
    .mat-column-botones { width: 20px; }
    .mat-column-botones2 { width: 32px; }
    .mat-column-nombre { padding-left: 16px; }
    .buttonLeft{ display:flex; right:15px;}
    .example-container { max-height:600px; overflow: auto;}
    th.mat-header-cell {padding-left: 20px}
    td.mat-cell { padding-left: 20px;}
    th.mat-header-cell:last-of-type {padding-right: 10px}
  `]
})
export class ComprobanteComponent implements OnInit {
  
  comprobantes: Comprobante[] = [];

  termino: string = '';

  cargando = true;

  displayedColumns: string[] = [
    'numero',
    'fecha',
    'total',
    'botones'
  ];

  constructor(private comprobanteService: ComprobanteService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarComprobantes()
  }

  cargarComprobantes() {
    this.cargando = true;

    this.comprobanteService.getComprobantes()
      .subscribe(comprobantes => {
        this.cargando = false
        this.comprobantes = comprobantes
      })
  }

  buscando() {
    if (this.termino.trim() === '') {

      this.cargarComprobantes()

    } else {

      this.comprobanteService.getComprobantesBuscador(this.termino.trim())
        .subscribe(comprobantes => {
          
          if (comprobantes.ok === false || comprobantes.length === 0) {
            Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
          } else {
            this.comprobantes = comprobantes
            console.log(this.comprobantes)
          }
        })
    }
  }

  verNav(comprobante: Comprobante){
    this.router.navigate([`gestion/comprobante/${comprobante._id}`])
  }
}
