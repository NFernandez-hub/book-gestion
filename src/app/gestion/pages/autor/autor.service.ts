import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Autor } from './autor.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

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

  getAutors() {
    return this.http.get<Autor[]>(`${this.baseUrl}/autores/`, this.headers)
  }

  getAutoresBuscador(termino: string) {
    return this.http.get<Autor[]>(`${this.baseUrl}/buscar/autores/nombre/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevoAutor(nombre: string){
    return this.http.post<Autor>(`${this.baseUrl}/autores/`, {nombre}, this.headers)
      .pipe(        
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarAutor(_id: string ,nombre: string){
    return this.http.put<Autor>(`${this.baseUrl}/autores/${_id}`, {nombre}, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  eliminarAutor(_id: string){
    return this.http.delete<Autor>(`${this.baseUrl}/autores/${_id}`, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }
}
