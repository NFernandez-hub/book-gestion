import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Usuario, AuthResponceRenew, usuarioLogin } from '../interface/interfaces';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario }
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password }

    return this.http.post<usuarioLogin>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            if (resp.usuario.rol == "ADMIN_ROLE") {
              localStorage.setItem('token', resp.token!)
            } else {
              Swal.fire('Error', 'El usuario ingresado no es administrador', 'error')
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponceRenew>(url, { headers })
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this.setToken(resp)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  setToken(resp: AuthResponceRenew) {
    localStorage.setItem('token', resp.token!)
    this._usuario = {
      nombre: resp.nombre!,
      uid: resp.uid!
    }
  }

  logout() {
    localStorage.clear();
  }

}
