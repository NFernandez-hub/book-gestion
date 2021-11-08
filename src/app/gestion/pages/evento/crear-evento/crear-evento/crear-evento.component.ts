import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Evento } from '../../evento/evento.interface';
import { EventoService } from '../../evento/evento.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styles: [
  ]
})
export class CrearEventoComponent implements OnInit {

  hora !: number
  minuto !: number
  fecha !: Date

  evento: Evento = {
    ok: false,
    nombre: '',
    descripcion: '',
    lugar: '',
    fechaHora: new Date
  }

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(private eventoService: EventoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.eventoService.getEventosPorId(id))
      )
      .subscribe(evento => this.evento = evento)
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, " ");
      // invalid character, prevent input
    }
  }

  guardar() {
    if (this.evento.nombre.trim().length === 0 || this.evento.descripcion.trim().length === 0 || this.evento.lugar.trim().length === 0
          || this.fecha === null || this.hora == null || this.minuto == null) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {
      this.fecha.setHours(this.hora, this.minuto)
      this.evento.fechaHora = this.fecha
      
      this.eventoService.nuevoEvento(this.evento)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Evento agregado correctamente', this.evento.nombre, 'success')
            this.router.navigate(['/gestion/evento'])
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })

    }
  }

}
