import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comprobante } from './comprobante.interface';
import { DetalleComprobante } from './ver-comprobante/detalle.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

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

  getComprobantes() {
    return this.http.get<Comprobante[]>(`${this.baseUrl}/comprobantes/`, this.headers)
  }

  getComprobanteNumero(id: string) {
    return this.http.get<Comprobante>(`${this.baseUrl}/comprobantes/${id}`, this.headers)
  }

  getDetalle(numero: number){
    return this.http.get<DetalleComprobante>(`${this.baseUrl}/buscar/comprobantes/detcompxnumcomp/${numero}`)
  }

  getComprobantesBuscador(termino: string) {
    return this.http.get<Comprobante[]>(`${this.baseUrl}/buscar/comprobantes/compnum/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

}
