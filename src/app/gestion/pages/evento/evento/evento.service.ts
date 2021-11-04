import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Evento } from './evento.interface';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

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

  getEventos() {
    return this.http.get<Evento[]>(`${this.baseUrl}/eventos/`, this.headers)
  }

  getEventosPorId(id: string){
    return this.http.get<Evento>(`${this.baseUrl}/eventos/${id}`)
  }

  getEventosBuscador(tipoDeBusqueda: string, termino: string) {
    return this.http.get<Evento[]>(`${this.baseUrl}/buscar/eventos/${tipoDeBusqueda}/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevoEvento(evento : Evento) {

    return this.http.post<Evento>(`${this.baseUrl}/eventos/`, evento, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarEvento(evento : Evento) {

    return this.http.put<Evento>(`${this.baseUrl}/eventos/${evento._id}`, evento, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  eliminarEvento(_id: string) {
    return this.http.delete<Evento>(`${this.baseUrl}/eventos/${_id}`, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
}
