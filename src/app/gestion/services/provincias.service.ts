import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Provincia } from '../pages/interfaces/provincia.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

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

  getProvincias() {
    return this.http.get<Provincia[]>(`${this.baseUrl}/provincias`)
  }
}
