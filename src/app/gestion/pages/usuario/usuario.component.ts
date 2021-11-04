import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
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
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  public totalUsuarios: number = 0;

  termino = '';

  cargando = true;

  TiposBuscador = [
    { id: 'nombre', desc: 'titulo' },
  ]

  displayedColumns: string[] = ['imagen', 'nombre', 'email', 'rol', 'estado', 'google', 'botones', 'botones2'];

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.getUsuarios(0)
      .subscribe(({ total, usuarios }) => {
        this.cargando = false;
        this.usuarios = usuarios;
        this.totalUsuarios = total;
      })
  }

  buscando() {
    if (this.termino.trim() === '') {

      Swal.fire('Info', 'Debe ingresar un termino de busqueda', 'info')

    } else {
      
      this.usuarioService.getUsuariosBuscador(this.termino.trim())
        .subscribe(usuarios => {
          console.log(usuarios)
          if (usuarios.ok === false || usuarios.length === 0) {
            Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
          } else {
            this.usuarios = usuarios
          }
        })
    }
  }

  modificarNav(usuario: Usuario) {
    this.router.navigate([`gestion/usuario/editar/${usuario.uid}`])
  }

  eliminarAutor(usuario: Usuario) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `El Usuario: ${usuario.nombre} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      confirmButtonColor: 'primary'
    }).then((result) => {

      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.uid!)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarUsuarios()
              Swal.fire('Usuario eliminado correctamente', usuario.nombre, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }

}
