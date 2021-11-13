import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cupon } from './cupon.interface';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

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

  getCupones(){
    return this.http.get<Cupon[]>(`${this.baseUrl}/cupones/`, this.headers)
  }

  getCuponesBuscador (tipoDeBusqueda: string, termino: string){
    return this.http.get<Cupon[]>(`${this.baseUrl}/buscar/cupones/${tipoDeBusqueda}/${termino}`)
    .pipe(
      catchError(err => of(err.error))
    )
  }

  nuevoCupon(cupon: Cupon){
    
    return this.http.post<Cupon>(`${this.baseUrl}/cupones/`, cupon , this.headers)
      .pipe(        
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  eliminarCupon(_id: string){
    return this.http.delete<Cupon>(`${this.baseUrl}/cupones/${_id}`, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
}
