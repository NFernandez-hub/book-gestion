import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Editorial } from './editorial.interface';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

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

  getEditoriales() {
    return this.http.get<Editorial[]>(`${this.baseUrl}/editoriales/`, this.headers)
  }

  getEditorialesBuscador(termino: string) {
    return this.http.get<Editorial[]>(`${this.baseUrl}/buscar/editoruales/nombre/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevaEditorial(nombre: string){
    return this.http.post<Editorial>(`${this.baseUrl}/editoriales/`, {nombre}, this.headers)
      .pipe(        
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarEditorial(_id: string ,nombre: string){
    return this.http.put<Editorial>(`${this.baseUrl}/editoriales/${_id}`, {nombre}, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  eliminarEditorial(_id: string){
    return this.http.delete<Editorial>(`${this.baseUrl}/editoriales/${_id}`, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }
}
