import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'productos' | 'eventos',
    id?: string
  ) {

    try {

      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('archivo', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      

      return console.log(data) ;

    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
