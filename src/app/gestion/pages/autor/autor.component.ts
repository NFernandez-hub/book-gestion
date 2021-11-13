import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Autor } from './autor.interface';
import { AutorService } from './autor.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
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
export class AutorComponent implements OnInit {

  autores: Autor[] = [];

  termino: string = '';

  cargando = true;

  displayedColumns: string[] = [
    'nombre',
    'usuario',
    'botones',
    'botones2'
  ];

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.cargarAutores()
  }

  cargarAutores() {
    this.cargando = true;

    this.autorService.getAutors()
      .subscribe(autores => {
        this.cargando = false
        this.autores = autores
      })
  }

  buscando() {
    if (this.termino.trim() === '') {

      this.cargarAutores()

    } else {

      this.autorService.getAutoresBuscador(this.termino.trim())
        .subscribe(autores => {
          
          if (autores.ok === false || autores.length === 0) {
            Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
          } else {
            this.autores = autores
          }
        })
    }
  }

  async nuevoSweetAlert() {
    const pattern = /^[a-zA-Z ]*$/; 

    const { value } = await Swal.fire<string>({
      title: 'Crear Autor',
      text: 'Ingrese el nombre del nuevo autor',
      input: 'text',
      inputPlaceholder: 'Nombre del Autor',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (pattern.test(value)) {
            resolve('')
          } else {
            resolve(`El nombre de el Autor no puede contener numeros: ${value}`)
          }
        })
      }
    })

    if (!value) {
      return
    } else if (value!.trim().length > 0) {
      this.autorService.nuevoAutor(value!)
        .subscribe(ok => {
          console.log(ok);
          if (ok === true) {
            this.cargarAutores()
            Swal.fire('Autor agregado correctamente', value, 'success')
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    } else {
      Swal.fire('Error', 'Nombre no valido', 'error')
    }
  }

  guardarCambios(autor: Autor) {
    this.modificarSweetAlert(autor._id, autor.nombre)
  }

  async modificarSweetAlert(id: string, nombre: string) {
    const pattern = /^[a-zA-Z ]*$/; 

    const { value } = await Swal.fire<string>({
      title: 'Modificar Autor',
      text: 'Ingrese el nombre del autor',
      input: 'text',
      inputPlaceholder: `${nombre}`,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (pattern.test(value)) {
            resolve('')
          } else {
            resolve(`El nombre de el Autor no puede contener numeros: ${value}`)
          }
        })
      }
    })

    if (!value) {
      return
    } else if (value!.trim().length > 0) {
      this.autorService.actualizarAutor(id, value!)
        .subscribe((ok) => {
          console.log(ok);
          if (ok === true) {
            this.cargarAutores()
            Swal.fire('Autor actualizado correctamente', value, 'success')
          } else {
            Swal.fire('Error', ok, 'error')
            console.log(ok)
          }
        })
    } else {
      Swal.fire('Error', 'Nombre no valido', 'error')
    }
  }

  eliminarAutor(autor: Autor) {

    Swal.fire({
      title: 'Esta seguro ?',
      text: `El Autor: ${autor.nombre} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.autorService.eliminarAutor(autor._id)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarAutores()
              Swal.fire('Autor eliminado correctamente', autor.nombre, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }
}
