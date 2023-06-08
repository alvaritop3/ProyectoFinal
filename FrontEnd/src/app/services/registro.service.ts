import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  baseUrl = 'https://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  //Servicio para crear un usuario nuevo
  registro(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, usuario);
  }
}
