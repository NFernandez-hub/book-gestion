import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SubCategoria } from './sub-categoria.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService {

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

  getSubCategorias() {
    return this.http.get<SubCategoria[]>(`${this.baseUrl}/subcategorias/`, this.headers)
  }

  getSubCategoriaPorId(id: string): Observable<SubCategoria>{
    return this.http.get<SubCategoria>(`${this.baseUrl}/subcategorias/${id}`)
  }

  getSubCategoriasBuscador(tipoDeBusqueda: string, termino: string) {
    return this.http.get<SubCategoria[]>(`${this.baseUrl}/buscar/categorias/${tipoDeBusqueda}/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevaSubCategoria(nombre: string, categoria: string){
    
    return this.http.post<SubCategoria>(`${this.baseUrl}/subcategorias/`, {nombre, categoria} , this.headers)
      .pipe(        
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarSubCategoria(_id: string ,nombre: string){
    return this.http.put<SubCategoria>(`${this.baseUrl}/subcategorias/${_id}`, {nombre}, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  eliminarSubCategoria(_id: string){
    return this.http.delete<SubCategoria>(`${this.baseUrl}/subcategorias/${_id}`, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }
}
