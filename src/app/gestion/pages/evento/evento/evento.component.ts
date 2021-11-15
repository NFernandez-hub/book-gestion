import { Component, OnInit } from '@angular/core';
import { Evento } from './evento.interface';
import { EventoService } from './evento.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
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
export class EventoComponent implements OnInit {

  eventos: Evento[] = []
  horaEvento!: number
  minEvento!: number

  TiposBuscador = [
    { id: 'nombre', desc: 'nombre' },
    { id: 'lugar', desc: 'lugar' }
  ]

  termino = '';

  tipoDeBuscada: string = '';

  displayedColumns: string[] = [
    'nombre',
    'lugar',
    'usuario',
    'fecha',
    'botones',
    'botones2',
  ]

  constructor(private eventoService: EventoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarEventos()
  }

  cargarEventos() {
    this.eventoService.getEventos()
      .subscribe(eventos => {
        this.eventos = eventos
      })
  }

  buscando() {

    if (this.termino.trim() === '') {
      this.cargarEventos()
    } else {
      if (!this.tipoDeBuscada) {

        Swal.fire('Info', 'Debe ingresar un tipo de busqueda', 'info')
  
      } else if (this.termino.trim() === '') {
  
        Swal.fire('Info', 'Debe ingresar un termino de busqueda', 'info')
  
      } else {
        this.eventoService.getEventosBuscador(this.tipoDeBuscada, this.termino.trim())
          .subscribe(eventos => {
            if (eventos.ok === false || eventos.length === 0) {
              Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
            } else {
              this.eventos = eventos
            }
          })
      }
    }
  }

  modificarNav(evento: Evento) {
    this.router.navigate([`gestion/evento/editar/${evento._id}`])
  }

  eliminarEvento(evento: Evento) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `El Evento: ${evento.nombre} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.eventoService.eliminarEvento(evento._id!)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarEventos()
              Swal.fire('Evento eliminado correctamente', evento.nombre, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }
}
