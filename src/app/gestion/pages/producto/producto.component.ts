import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { Producto } from './producto.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
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
export class ProductoComponent implements OnInit {

  TiposBuscador = [
    { id: 'autor', desc: 'autor' },
    { id: 'editorial', desc: 'editorial' },
    { id: 'categoria', desc: 'categoria', },
    { id: 'titulo', desc: 'titulo' },
    { id: 'subcat', desc: 'subCategoria' }
  ]

  termino = '';

  tipoDeBuscada: string = '';

  productos: Producto[] = []

  displayedColumns: string[] = ['titulo', 'precio', 'isbn', 'stock', 'usuario', 'botones', 'botones2'];

  constructor(private productoService: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarProductos()
  }

  cargarProductos() {
    this.productoService.getProductos()
      .subscribe(productos => {
        this.productos = productos
      })
  }

  buscando() {
    if (!this.tipoDeBuscada) {

      Swal.fire('Info', 'Debe ingresar un tipo de busqueda', 'info')

    } else if (this.termino.trim() === '') {

      Swal.fire('Info', 'Debe ingresar un termino de busqueda', 'info')

    } else {

      console.log(this.tipoDeBuscada)
      this.productoService.getProductosBuscador(this.tipoDeBuscada, this.termino.trim())
        .subscribe(productos => {
          console.log(productos)
          if (productos.ok === false || productos.length === 0) {
            Swal.fire('Error', `No se encontraron resultados con el termino: ${this.termino}`, 'error')
          } else {
            this.productos = productos
          }
        })
    }
  }

  modificarNav(producto: Producto) {
    this.router.navigate([`gestion/producto/editar/${producto._id}`])
  }

  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: 'Esta seguro ?',
      text: `El Producto: ${producto.titulo} se eliminara de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.productoService.eliminarProducto(producto._id!)
          .subscribe(ok => {
            if (ok === true) {
              this.cargarProductos()
              Swal.fire('Producto eliminado correctamente', producto.titulo, 'success')
            } else {
              Swal.fire('Error', ok, 'error')
            }
          })
      }
    })
  }

}
