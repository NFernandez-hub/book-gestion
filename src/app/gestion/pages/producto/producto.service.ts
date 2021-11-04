import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto, ProductoModificar } from './producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getProductos() {
    return this.http.get<Producto[]>(`${this.baseUrl}/productos/`, this.headers)
  }

  getProductosPorId(id: string) {
    return this.http.get<Producto>(`${this.baseUrl}/productos/${id}`)

  }

  getProductosPorIdM(id: string) {
    return this.http.get<ProductoModificar>(`${this.baseUrl}/productos/${id}`)
  }

  getProductosBuscador(tipoDeBusqueda: string, termino: string) {
    return this.http.get<Producto[]>(`${this.baseUrl}/buscar/productos/${tipoDeBusqueda}/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevoProducto(titulo: string, descripcion: string, precio: number,
    isbn: number, formato: string, editorial: string, autor: string,
    subCategoria: string, idioma: string, edicion: string, stock: number) {

    const body = {
      titulo, descripcion, precio, isbn, formato, editorial, autor,
      subCategoria, idioma, edicion, stock
    }
    
    return this.http.post<Producto>(`${this.baseUrl}/productos/`, body, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarProducto(producto: ProductoModificar) {

    return this.http.put<Producto>(`${this.baseUrl}/productos/${producto._id}`, producto, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  eliminarProducto(_id: string) {
    return this.http.delete<Producto>(`${this.baseUrl}/productos/${_id}`, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
}
