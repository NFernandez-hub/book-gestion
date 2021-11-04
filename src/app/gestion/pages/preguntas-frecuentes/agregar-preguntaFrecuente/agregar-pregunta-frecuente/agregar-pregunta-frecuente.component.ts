import { Component, OnInit } from '@angular/core';
import { PreguntaFrecuente } from '../../preguntas-frecuentes.interface';
import { PreguntasFrecuentesService } from '../../preguntas-frecuentes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-pregunta-frecuente',
  templateUrl: './agregar-pregunta-frecuente.component.html',
  styles: [
  ]
})
export class AgregarPreguntaFrecuenteComponent implements OnInit {

  preguntaFrecuente: PreguntaFrecuente = {
    ok: false,
    pregunta: '',
    respuesta: ''
  }

  constructor(private preguntaFrecuenteService: PreguntasFrecuentesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.preguntaFrecuenteService.getPreguntasPorId(id))
      )
      .subscribe(preguntaFrecuente => this.preguntaFrecuente = preguntaFrecuente)
  }

  guardar() {

    if (this.preguntaFrecuente.pregunta.trim().length === 0 || this.preguntaFrecuente.respuesta.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios: pregunta/respuesta', 'error')
    } else {
      this.preguntaFrecuenteService.nuevaPregunta(this.preguntaFrecuente)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('' , 'Pregunta agregada correctamente' , 'success')
            this.router.navigate(['/gestion/preguntasFrecuentes'])
          } else {
            Swal.fire('Error', `La Pregunta ingresada ya se encuentra registrada`, 'error')
          }
        })
    }

  }

}
