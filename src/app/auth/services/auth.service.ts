import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Usuario, AuthResponceRenew } from '../interface/interfaces';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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

    return this.http.post<AuthResponceRenew>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this.setToken(resp)
            console.log(resp)
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
            console.log(resp)
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
