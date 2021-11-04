import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/gestion/services/file-upload.service';
import Swal from 'sweetalert2';
import { Evento } from '../../evento/evento.interface';
import { EventoService } from '../../evento/evento.service';

@Component({
  selector: 'app-modificar-evento',
  templateUrl: './modificar-evento.component.html',
  styles: [`
    .example-card {
      max-width: 550px;
    }

    .example-header-image {
      background-size: cover;
    }
  `]
})
export class ModificarEventoComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService) { }

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

  cambiarImagen(event: any): any {
    this.imagenSubir = event.target.files[0];

    console.log(event.target.files[0])
    if (!event.target.files[0]) { return }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
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

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'eventos', this.evento._id)
    console.log(this.imagenSubir, this.evento._id)
    Swal.fire('Imagen cargada correctamente', `evento: ${this.evento.nombre}`, 'success')
  }

  guardar() {
    if (this.evento.nombre.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {
      if (this.evento._id) {
        this.eventoService.actualizarEvento(this.evento)
          .subscribe(ok => {
            if (ok === true) {
              Swal.fire('Usuario modificado correctamente', this.evento.nombre, 'success')
              this.router.navigate(['/gestion/evento'])
            }
          })
      }
    }
  }
}
