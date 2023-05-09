import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoInterface } from '../interfaces/curso-interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'https://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  //Servicio para obtener todos los cursos
  listaCursos(): Observable<CursoInterface[]>{
    return this.http.get<CursoInterface[]>(`${this.baseUrl}/admin/cursos/`);
  }

  //Crear un nuevo curso
  crearCurso(curso: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/admin/addCurso/`, curso);
  }
}
