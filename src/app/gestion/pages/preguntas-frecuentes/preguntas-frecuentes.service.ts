import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PreguntaFrecuente } from './preguntas-frecuentes.interface';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasFrecuentesService {

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

  getPreguntas() {
    return this.http.get<PreguntaFrecuente[]>(`${this.baseUrl}/preguntasFrecuentes/`, this.headers)
  }

  getPreguntasPorId(id: string): Observable<PreguntaFrecuente> {
    return this.http.get<PreguntaFrecuente>(`${this.baseUrl}/preguntasFrecuentes/${id}`)
  }

  getPreguntasBuscador(termino: string) {
    return this.http.get<PreguntaFrecuente[]>(`${this.baseUrl}/buscar/preguntas/pregunta/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevaPregunta (preguntaFrecuente: PreguntaFrecuente){

    console.log(preguntaFrecuente)

    return this.http.post<PreguntaFrecuente>(`${this.baseUrl}/preguntasFrecuentes/`, preguntaFrecuente, this.headers)
      .pipe(        
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarPregunta(pregunta : PreguntaFrecuente){
    return this.http.put<PreguntaFrecuente>(`${this.baseUrl}/preguntasFrecuentes/${pregunta._id}`, pregunta , this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  eliminarPregunta(_id: string){
    return this.http.delete<PreguntaFrecuente>(`${this.baseUrl}/preguntasFrecuentes/${_id}`, this.headers)
    .pipe(        
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }
}
