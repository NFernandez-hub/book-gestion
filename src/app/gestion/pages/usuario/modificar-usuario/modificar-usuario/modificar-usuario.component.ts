import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../../../services/file-upload.service';
import { switchMap } from 'rxjs/operators';
import { Usuario, Role } from '../../usuario.interface';
import { ProvinciasService } from '../../../../services/provincias.service';
import { Provincia } from '../../../interfaces/provincia.interface';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styles: [`
  
  .example-card {
      max-width: 450px;
    }

    .example-header-image {
      background-size: cover;
    }

    img{
      width: 100%;
      border-radius:5px;
      margin-left: 1px
    }
  `]
})
export class ModificarUsuarioComponent implements OnInit {

  Roles = [
    {
      id: 'ADMIN_ROLE',
      desc: 'ADMIN'
    },
    {
      id: 'USER_ROLE',
      desc: 'USER'
    }
  ]

  usuario: Usuario = {
    ok: false,
    nombre: '',
    email: '',
    img: '',
    password: '',
    rol: Role.USER_ROLE,
    estado: true,
    google: true,
    provincia: '',
    codigoPostal: undefined,
    localidad: '',
    celular: undefined,
    direccion: ''
  }

  provincias: Provincia[] = []

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private provinciaService: ProvinciasService) { }

  ngOnInit(): void {

    this.getProvincias()

    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usuarioService.getUsuarioPorId(id))
      )
      .subscribe(usuario => this.usuario = usuario)
  }

  getProvincias() {
    this.provinciaService.getProvincias()
      .subscribe(provincias => {
        this.provincias = provincias
      })
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
    const pattern = /^[a-zA-Z ]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid);
    Swal.fire('Imagen cargada correctamente', `usuario: ${this.usuario.nombre}`, 'success')
  }

  guardar() {
    if (this.usuario.nombre.trim().length === 0 || this.usuario.email.trim().length === 0
      || this.usuario.localidad.trim().length === 0 || this.usuario.provincia.trim().length === 0 || this.usuario.direccion.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {

      if (this.usuario.codigoPostal?.toString().length !== 4) {
        Swal.fire('Error', 'Codigo postal invalido. Ej: 4107', 'error')
      } else if (this.usuario.celular?.toString().trim().length !== 12) {
        Swal.fire('Error', 'Celular ingresado invalido. Ej: 543813025984', 'error')
      } else {
        this.usuarioService.actualizarUsuario(this.usuario)
          .subscribe(ok => {
            console.log(ok)
            if (ok === true) {
              Swal.fire('Usuario agregado correctamente', this.usuario.nombre, 'success')
              this.router.navigate(['/gestion/usuario'])
            } else {
              Swal.fire('Error', 'El email ingresado no es valdio o ya se encuentra registrado. Ej: bookshop@gmail.com', 'error')
            }
          })
      }
    }
  }

}
