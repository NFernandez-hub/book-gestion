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

  cupones: Cupon[] = [];

  cargando = true;

  displayedColumns: string[] = ['nombre', 'codigo', 'usos', 'valor', 'porcentaje', 'tipo', 'botones', 'botones2'];

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
