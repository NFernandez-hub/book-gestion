import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PreguntaFrecuente } from './preguntas-frecuentes.interface';
import { PreguntasFrecuentesService } from './preguntas-frecuentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
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
export class PreguntasFrecuentesComponent implements OnInit {

  preguntas: PreguntaFrecuente[] = [];

  termino: string = '';

  cargando = true;

  displayedColumns: string[] = [
    'nombre',
    'usuario',
    'botones',
    'botones2'
  ];

  constructor(private preguntasFrecuentesService: PreguntasFrecuentesService,
    private router : Router) { }

  ngOnInit(): void {
    this.cargarPreguntas()
  }

  cargarPreguntas() {
    this.cargando = true;

    this.preguntasFrecuentesService.getPreguntas()
      .subscribe(preguntas => {
        this.cargando = false
        this.preguntas = preguntas
      })
  }

  // buscando() {
  //   if (this.termino.trim() === '') {

  //     Swal.fire('Info', 'Debe ingresar un termino de busqueda', 'info')

  //   } else {

  //     this.autorService.getAutoresBuscador(this.termino.trim())
  //       .subscribe(preguntas => {
  //         console.log(autores)
  //         if (preguntas.ok === false || preguntas.length === 0) {
  //           Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
  //         } else {
  //           this.preguntas = preguntas
  //         }
  //       })
  //   }
  // }

  modificarNav(pregunta: PreguntaFrecuente) {
    this.router.navigate([`gestion/preguntasFrecuentes/editar/${pregunta._id}`])
  }

  eliminarPregunta(pregunta: PreguntaFrecuente) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `La Pregunta: ${pregunta.pregunta} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.preguntasFrecuentesService.eliminarPregunta(pregunta._id!)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarPreguntas()
              Swal.fire('Pregunta eliminado correctamente', pregunta.pregunta, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }

}
