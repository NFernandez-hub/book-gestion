import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { SubCategoriaService } from '../../../sub-categoria/sub-categoria.service';
import { SubCategoria } from '../../../sub-categoria/sub-categoria.interfaces';
import { Editorial } from '../../../editorial/editorial.interface';
import { ProductoService } from '../../producto.service';
import { Autor } from '../../../autor/autor.interface';
import { Producto } from '../../producto.interface';

import { EditorialService } from '../../../editorial/editorial.service';
import { AutorService } from '../../../autor/autor.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styles: [`
    
  `]
})
export class CrearProductoComponent implements OnInit {

  producto: Producto = {
    titulo: '',
    descripcion: '',
    precio: undefined,
    isbn: undefined,
    formato: '',
    editorial: '',
    autor: '',
    subCategoria: '',
    idioma: '',
    edicion: '',
    stock: undefined,
  }

  public subCategorias: SubCategoria[] = []
  public autores: Autor[] = []
  public editoriales: Editorial[] = []
  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(private productoService: ProductoService,
    private subCategoriaService: SubCategoriaService,
    private activatedRoute: ActivatedRoute,
    private autorService: AutorService,
    private EditorialService: EditorialService,
    private router: Router) { }

  ngOnInit(): void {

    this.getSubCategorias()
    this.getAutores()
    this.getEditoriales()

    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productoService.getProductosPorId(id))
      )
      .subscribe(producto => { this.producto = producto, console.log(this.producto) })
  }

  getSubCategorias() {
    this.subCategoriaService.getSubCategorias()
      .subscribe(SubCategorias => {
        this.subCategorias = SubCategorias
      })
  }

  getAutores() {
    this.autorService.getAutors()
      .subscribe(autores => {
        this.autores = autores
      })
  }

  getEditoriales() {
    this.EditorialService.getEditoriales()
      .subscribe(editoriales => {
        this.editoriales = editoriales
      })
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
    if (this.producto.titulo.trim().length === 0 || this.producto.descripcion.trim().length === 0
      || this.producto.precio?.toString().trim().length === undefined || this.producto.isbn?.toString().trim().length === undefined
      || this.producto.formato.trim().length === 0 || this.producto.subCategoria.trim().length === 0
      || this.producto.autor.trim().length === 0 || this.producto.editorial.trim().length === 0
      || this.producto.idioma.trim().length === 0 || this.producto.edicion.trim().length === 0
      || this.producto.stock?.toString().trim().length === undefined) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else if (this.producto.precio < 0 || this.producto.isbn < 0 || this.producto.stock < 0) {
      Swal.fire('Error', 'Los campos numericos: Precio , ISBN y stock no pueden tener valores negativos', 'error')
    } else {
      console.log(this.producto)
      this.productoService.nuevoProducto(this.producto)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Producto agregado correctamente', this.producto.titulo, 'success')
            this.router.navigate(['/gestion/producto'])
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    }
  }
}
