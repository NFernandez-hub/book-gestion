import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Role, Usuario } from '../usuario.interface';
import { UsuarioService } from '../usuario.service';
import { FileUploadService } from '../../../services/file-upload.service';


@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

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
  }

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usuarioService.getUsuarioPorId(id))
      )
      .subscribe(usuario => this.usuario = usuario)
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid);
    Swal.fire('Imagen cargada correctamente', `usuario: ${this.usuario.nombre}`, 'success')
  }

  guardar() {
    if (this.usuario.nombre.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {
      this.usuarioService.nuevoUsuario(this.usuario)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Usuario agregado correctamente', this.usuario.nombre, 'success')
            this.router.navigate(['/gestion/usuario'])
          } else {
            Swal.fire('Error', `El email ${this.usuario.email} ya se encuentra registrado`, 'error')
          }
        })
    }

  }
}
