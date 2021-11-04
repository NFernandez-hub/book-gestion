import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Usuario } from './usuario.interface';
import { CargarUsuario } from './cargar-usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  getUsuarios(desde: number = 0) {
    return this.http.get<CargarUsuario>(`${this.baseUrl}/usuarios/?limite=100&desde=${desde}`, this.headers)
  }

  getUsuarioPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`)
  }

  getUsuariosBuscador(termino: string) {
    return this.http.get<Usuario[]>(`${this.baseUrl}/buscar/usuarios/f/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevoUsuario(usuario : Usuario) {

    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/`, usuario)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarUsuario(usuario : Usuario) {

    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  eliminarUsuario(_id: string) {
    return this.http.delete<Usuario>(`${this.baseUrl}/usuarios/${_id}`, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
}
