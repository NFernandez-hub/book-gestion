import { Component, OnInit } from '@angular/core';
import { Cupon } from './cupon.interface';
import { CuponService } from './cupon.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styles: [
    `table { width: 100%; }
    .mat-column-botones { width: 20px; }
    .mat-column-botones2 { width: 32px; }
    .mat-column-nombre { padding-left: 16px; }
    .buttonLeft{ display:flex; right:15px;}
    .example-container { max-height:600px; overflow: auto;}
    th.mat-header-cell {padding-left: 20px}
    td.mat-cell { padding-left: 20px;}
    th.mat-header-cell:last-of-type {padding-right: 10px}`
  ]
})
export class CuponComponent implements OnInit {

  TiposBuscador = [
    {id: 'nombre', desc: 'nombre'},
    {id: 'codigo', desc: 'codigo'}
  ]

  termino = '';

  tipoDeBuscada: string = '';

  cupones: Cupon[] = [];

  cargando = true;

  displayedColumns: string[] = ['nombre', 'codigo', 'usos', 'valor', 'porcentaje', 'tipo', 'botones2'];

  constructor(private cuponService: CuponService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarCupones()
  }

  cargarCupones() {
    this.cargando = true;

    this.cuponService.getCupones()
      .subscribe((cupones) => {
        this.cargando = false;
        this.cupones = cupones
      })
  }

  buscando() {

    if (this.termino.trim() === '') {
      this.cargarCupones()
    } else {
      if (!this.tipoDeBuscada) {

        Swal.fire('Info', 'Debe ingresar un tipo de busqueda', 'info')
  
      } else if (this.termino.trim() === '') {
  
        Swal.fire('Info', 'Debe ingresar un termino de busqueda', 'info')
  
      } else {
  
        console.log(this.tipoDeBuscada)
        this.cuponService.getCuponesBuscador(this.tipoDeBuscada, this.termino.trim())
          .subscribe(cupones => {
            console.log(cupones)
            if (cupones.ok === false || cupones.length === 0) {
              Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
            } else {
              this.cupones = cupones
            }
          })
      }
    }
  }

  modificarNav(cupon: Cupon) {
    this.router.navigate([`gestion/cupon/editar/${cupon._id}`])
  }

  eliminarCupon(cupon: Cupon) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `El Cupon: ${cupon.nombre} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.cuponService.eliminarCupon(cupon._id!)
      .subscribe(ok => {
        if (ok === true) {
          this.cargarCupones()
          Swal.fire('Cupon eliminado correctamente', cupon.nombre, 'success')
        } else {
          Swal.fire('Error', ok, 'error')
        }
      })
      }
    })
  }

}
