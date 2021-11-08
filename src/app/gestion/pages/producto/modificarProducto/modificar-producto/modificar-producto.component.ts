import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../../../services/file-upload.service';
import { ProductoService } from '../../producto.service';
import { SubCategoriaService } from '../../../sub-categoria/sub-categoria.service';
import { EditorialService } from '../../../editorial/editorial.service';
import { AutorService } from '../../../autor/autor.service';

import { ProductoModificar } from '../../producto.interface';
import { SubCategoria } from '../../../sub-categoria/sub-categoria.interfaces';
import { Autor } from '../../../autor/autor.interface';
import { Editorial } from '../../../editorial/editorial.interface';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styles: [`
    .example-card {
      max-width: 360px;
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
export class ModificarProductoComponent implements OnInit {

  producto: ProductoModificar = {
    titulo: '',
    descripcion: '',
    precio: 0,
    isbn: 0,
    formato: '',
    editorial: {
      _id: '',
      nombre: '',
    },
    autor: {
      _id: '',
      nombre: '',
    },
    subCategoria: {
      _id: '',
      nombre: '',
    },
    idioma: '',
    edicion: '',
    stock: 0,
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
    private fileUploadService: FileUploadService,
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
        switchMap(({ id }) => this.productoService.getProductosPorIdM(id))
      )
      .subscribe(producto => this.producto = producto)
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

  cambiarImagen(event: any): any {
    this.imagenSubir = event.target.files[0];

    if (!event.target.files[0]) { return }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'productos', this.producto._id);
    Swal.fire('Imagen cargada correctamente', `producto: ${this.producto.titulo}`, 'success')
  }

  guardar() {

    if (this.producto.titulo.trim().length === 0 || this.producto.descripcion.trim().length === 0
      || this.producto.precio?.toString().trim().length === undefined || this.producto.isbn?.toString().trim().length === undefined
      || this.producto.formato.trim().length === 0 || this.producto.subCategoria._id.trim().length === 0
      || this.producto.autor._id.trim().length === 0 || this.producto.editorial._id.trim().length === 0
      || this.producto.idioma.trim().length === 0 || this.producto.edicion.trim().length === 0
      || this.producto.stock?.toString().trim().length === undefined) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else if (this.producto.precio < 0 || this.producto.isbn < 0 || this.producto.stock < 0) {
      Swal.fire('Error', 'Los campos numericos: Precio , ISBN y stock no pueden tener valores negativos', 'error')
    } else {
      console.log(this.producto)
      this.productoService.actualizarProducto(this.producto)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Producto actualizado correctamente', this.producto.titulo, 'success')
            this.router.navigate(['/gestion/producto'])
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    }
  }
}
