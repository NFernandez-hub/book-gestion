import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/gestion/services/file-upload.service';
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

  evento: Evento = {
    ok: false,
    nombre: '',
    descripcion: '',
    lugar: '',
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
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  guardar() {
    if (this.evento.nombre.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {

      this.eventoService.nuevoEvento(this.evento)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Usuario agregado correctamente', this.evento.nombre, 'success')
            this.router.navigate(['/gestion/evento'])
          } else {
            Swal.fire('Error', `El evento ${this.evento.nombre} ya se encuentra registrado`, 'error')
          }
        })

    }
  }

}
