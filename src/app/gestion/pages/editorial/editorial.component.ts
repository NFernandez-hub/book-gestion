import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Editorial } from './editorial.interface';
import { EditorialService } from './editorial.service';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styles: [
    `table { width: 100%; }
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
export class EditorialComponent implements OnInit {

  editoriales: Editorial[] = [];

  termino = '';

  cargando = true;

  displayedColumns: string[] = ['nombre', 'usuario', 'botones', 'botones2'];

  constructor(private editorialService: EditorialService) { }

  ngOnInit(): void {
    this.cargarEditoriales()
  }

  cargarEditoriales() {
    this.cargando = true;

    this.editorialService.getEditoriales()
      .subscribe(editoriales => {
        this.cargando = false
        this.editoriales = editoriales
      })
  }

  buscando() {
    if (this.termino.trim() === '') {

      Swal.fire('Info', 'Debe ingresar un termino de busqueda', 'info')

    } else {

      this.editorialService.getEditorialesBuscador(this.termino.trim())
        .subscribe(editoriales => {
          console.log(editoriales)
          if (editoriales.ok === false || editoriales.length === 0) {
            Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
          } else {
            this.editoriales = editoriales
          }
        })
    }
  }

  async nuevoSweetAlert() {
    const pattern = /^[a-zA-Z]*$/;

    const { value } = await Swal.fire<string>({
      title: 'Crear Editorial',
      text: 'Ingrese el nombre de la editorial',
      input: 'text',
      inputPlaceholder: 'Nombre de la editorial',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (pattern.test(value)) {
            resolve('')
          } else {
            resolve(`El nombre de la Editorial no puede contener numeros: ${value}`)
          }
        })
      }
    })

    if (!value) {
      return
    } else if (value!.trim().length > 0) {
      this.editorialService.nuevaEditorial(value!)
        .subscribe(ok => {
          if (ok === true) {
            this.cargarEditoriales()
            Swal.fire('Editorial agregada correctamente', value, 'success')
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    }
  }

  guardarCambios(editorial: Editorial) {
    this.modificarSweetAlert(editorial._id, editorial.nombre)
  }

  async modificarSweetAlert(id: string, nombre: string) {
    const pattern = /^[a-zA-Z]*$/;

    const { value } = await Swal.fire<string>({
      title: 'Modificar editorial',
      text: 'Ingrese el nombre de la editorial',
      input: 'text',
      inputPlaceholder: `${nombre}`,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (pattern.test(value)) {
            resolve('')
          } else {
            resolve(`El nombre de la Editorial no puede contener numeros: ${value}`)
          }
        })
      }
    })

    if (!value) {
      return
    } else if (value!.trim().length > 0) {
      this.editorialService.actualizarEditorial(id, value!)
        .subscribe((ok) => {
          if (ok === true) {
            this.cargarEditoriales()
            Swal.fire('Editorial actualizada correctamente', value, 'success')
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    }
  }

  eliminarEditorial(editorial: Editorial) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `La Editorial: ${editorial.nombre} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.editorialService.eliminarEditorial(editorial._id)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarEditoriales()
              Swal.fire('Editorial eliminada correctamente', editorial.nombre, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }

}
