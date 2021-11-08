import { Component, OnInit } from '@angular/core';
import { Cupon, TipoCupon } from '../../cupon.interface';
import { CuponService } from '../../cupon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cupon',
  templateUrl: './crear-cupon.component.html',
  styles: [
  ]
})
export class CrearCuponComponent implements OnInit {

  Tipos = [
    {
      id: 'GIFT_CARD',
      desc: 'GIFT_CARD'
    },
    {
      id: 'VOUCHER',
      desc: 'VOUCHER'
    }
  ]

  public tipoCuponTemp = 'GIFT_CARD'

  cupon: Cupon = {

    ok: false,
    nombre: '',
    codigo: '',
    usos: 1,
    valor: undefined,
    porcentaje: undefined,
    tipo: TipoCupon.GIFT_CARD,
  }

  constructor(private cuponService: CuponService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {  
    
  }

  guardar() {
    if (this.cupon.nombre!.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {
      this.cuponService.nuevoCupon(this.cupon)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Cupon agregado correctamente', this.cupon.nombre, 'success')
            this.router.navigate(['/gestion/cupon'])
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    }
  }

  saveTipe(tipo: string) {
    this.tipoCuponTemp = tipo
  }

}
