import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubCategoria } from './sub-categoria.interfaces';
import { SubCategoriaService } from './sub-categoria.service';
import { CategoriaService } from '../categoria/categoria.service';
import { Categoria } from '../categoria/categoria.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-categoria',
  templateUrl: './sub-categoria.component.html',
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
export class SubCategoriaComponent implements OnInit {

  subCategorias: SubCategoria[] = [];

  TiposBuscador = [
    { id: 'subcatxcat', desc: 'categoria' },
    { id: 'nombre', desc: 'nombre' }
  ]

  termino = '';

  tipoDeBuscada: string = '';

  cargando = true;

  categorias: Categoria[] = [];

  displayedColumns: string[] = ['nombre','categoria', 'usuario', 'botones', 'botones2'];

  constructor(private subCategoriaService: SubCategoriaService,
    private categoriaService: CategoriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarSubCategorias()
    this.getCategorias()
  }

  getCategorias() {
    this.categoriaService.getCategorias()
      .subscribe(categorias => {
        this.categorias = categorias
      })
  }

  buscando() {
    if (this.termino.trim() === '') {
      this.cargarSubCategorias()
    } else {
      if (!this.tipoDeBuscada) {

        Swal.fire('Info', 'Debe ingresar un tipo de busqueda', 'info')

      } else
        if (this.termino.trim() === '') {

          Swal.fire('Info', 'Debe ingresar un termino de busqueda', 'info')

        } else {

          console.log(this.tipoDeBuscada)
          this.subCategoriaService.getSubCategoriasBuscador(this.tipoDeBuscada, this.termino.trim())
            .subscribe(subCategorias => {
              console.log(subCategorias)
              if (subCategorias.ok === false || subCategorias.length === 0) {
                console.log(subCategorias)
                Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
              } else {
                this.subCategorias = subCategorias
              }
            })
        }
    }
  }

  cargarSubCategorias() {
    this.cargando = true;

    this.subCategoriaService.getSubCategorias()
      .subscribe(subCategorias => {
        this.cargando = false
        this.subCategorias = subCategorias
      })
  }

  modificarNav(subCategoria: SubCategoria) {
    this.router.navigate([`gestion/subCategoria/editar/${subCategoria._id}`])
  }

  eliminarSubCategoria(subCategoria: SubCategoria) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `La Sub-categoria: ${subCategoria.nombre} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.subCategoriaService.eliminarSubCategoria(subCategoria._id!)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarSubCategorias()
              Swal.fire('Sub-categoria eliminada correctamente', subCategoria.nombre, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }

}
