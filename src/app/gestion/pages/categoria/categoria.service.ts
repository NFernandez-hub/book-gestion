import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Categoria } from './categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers:{
        'x-token' : this.token
      }
    }
  }

  getCategorias() {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias/`, this.headers)
  }

  getUsuariosBuscador(termino: string) {
    return this.http.get<Categoria[]>(`${this.baseUrl}/buscar/categorias/nombre/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevaCategoria(nombre: string){
    return this.http.post<Categoria>(`${this.baseUrl}/categorias/`, {nombre}, this.headers)
      .pipe(        
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarCategorias(_id: string ,nombre: string){
    return this.http.put<Categoria>(`${this.baseUrl}/categorias/${_id}`, {nombre}, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  eliminarCategoria(_id: string){
    return this.http.delete<Categoria>(`${this.baseUrl}/categorias/${_id}`, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }
}
