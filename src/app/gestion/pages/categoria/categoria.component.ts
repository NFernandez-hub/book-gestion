import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Categoria } from './categoria.interface';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
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

export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];

  cargando = true;

  termino = '';

  displayedColumns: string[] = ['nombre', 'usuario', 'botones', 'botones2'];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.cargarCategorias()
  }

  cargarCategorias() {
    this.cargando = true;

    this.categoriaService.getCategorias()
      .subscribe(categorias => {
        this.cargando = false
        this.categorias = categorias
      })
  }

  buscando() {
    if (this.termino.trim() === '') {

      this.cargarCategorias()

    } else {

      this.categoriaService.getUsuariosBuscador(this.termino.trim())
        .subscribe(categorias => {
          
          if (categorias.ok === false || categorias.length === 0) {
            Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
          } else {
            this.categorias = categorias
          }
        })
    }
  }

  async nuevoSweetAlert() {

    const pattern = /^[a-zA-Z ]*$/;

    const { value } = await Swal.fire<string>({
      title: 'Crear categoria',
      text: 'Ingrese la categoria',
      input: 'text',
      inputPlaceholder: 'Descripcion',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (pattern.test(value)) {
            resolve('')
          } else {
            resolve(`El nombre de la Categoria no puede contener numeros: ${value}`)
          }
        })
      }
    })

    if (!value) {
      return
    } else if (value!.trim().length > 0) {
      this.categoriaService.nuevaCategoria(value!)
        .subscribe(ok => {
          console.log(ok);
          if (ok === true) {
            this.cargarCategorias()
            Swal.fire('Categoria agregada correctamente', value, 'success')
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    } else {
      Swal.fire('Error', 'Description no valida', 'error')
    }
  }

  guardarCambios(categoria: Categoria) {
    this.modificarSweetAlert(categoria._id, categoria.nombre)
  }

  async modificarSweetAlert(id: string, nombre: string) {
    const pattern = /^[a-zA-Z ]*$/;

    const { value } = await Swal.fire<string>({
      title: 'Modificar categoria',
      text: 'Ingrese la categoria',
      input: 'text',
      inputPlaceholder: `${nombre}`,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (pattern.test(value)) {
            resolve('')
          } else {
            resolve(`El nombre de la Categoria no puede contener numeros: ${value}`)
          }
        })
      }
    })

    if (!value) {
      return
    } else if (value!.trim().length > 0) {
      this.categoriaService.actualizarCategorias(id, value!)
        .subscribe((ok) => {
          console.log(ok);
          if (ok === true) {
            this.cargarCategorias()
            Swal.fire('Categoria actualizada correctamente', value, 'success')
          } else {
            Swal.fire('Error', ok, 'error')
            console.log(ok)
          }
        })
    } else {
      Swal.fire('Error', 'Descripcion no valida', 'error')
    }
  }

  eliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `La Categoria: ${categoria.nombre} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria._id)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarCategorias()
              Swal.fire('Cetegoria eliminada correctamente', categoria.nombre, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }

}
