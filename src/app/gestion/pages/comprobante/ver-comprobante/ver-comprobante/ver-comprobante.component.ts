import { Component, OnInit } from '@angular/core';
import { Comprobante } from '../../comprobante.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ComprobanteService } from '../../comprobante.service';
import { DetalleComprobante } from '../detalle.interface';
import { Producto } from '../../../producto/producto.interface';

@Component({
  selector: 'app-ver-comprobante',
  templateUrl: './ver-comprobante.component.html',
  styles: [`
  table { width: 100%; }
  .mat-column-nombre { padding-left: 16px; }
  .buttonLeft{ display:flex; right:15px;}
  .example-container { max-height:600px; overflow: auto;}
  th.mat-header-cell {padding-left: 20px}
  td.mat-cell { padding-left: 20px;}
  th.mat-header-cell:last-of-type {padding-right: 10px}
  .mat-input-element:disabled{color: black}
`]
})
export class VerComprobanteComponent implements OnInit {

  comprobante: Comprobante = {
    numero: 0,
    fecha: '',
    detalleComprobante: '',
    subTotal: undefined,
    descuento: undefined,
    total: undefined,
    usuario: {
        _id: '',
        nombre: '',
    },
    cupon: {
        _id: '',
        nombre: ''
    }
  }

  displayedColumns: string[] = ['titulo', 'precio', 'isbn', 'cantidad'];

  detalle: DetalleComprobante = {
    ok: false,
    detComprobante: {
      _id: '',
      productos: [
        {
          _id: '',
          titulo: '',
          descripcion: '',
          precio: 0,
          isbn: 0,
          formato: '',
          img: '',
          editorial: '',
          autor: '',
          subCategoria: '',
          idioma: '',
          edicion: '',
          stock: 0,
          usuario: '',
          cantidad: 0
        }
      ]
    }
  }

  constructor(private comprobanteService: ComprobanteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getComprobante()
  }

  getComprobante() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.comprobanteService.getComprobanteNumero(id))
      )
      .subscribe(comprobante => {
        if (comprobante) {
          this.comprobante = comprobante
          this.getDetalle(this.comprobante.numero!)
        }
      })
  }

  getDetalle(numero: number) {
    this.comprobanteService.getDetalle(numero)
      .subscribe(detalle => {
        this.detalle = detalle
      })
  }

}
