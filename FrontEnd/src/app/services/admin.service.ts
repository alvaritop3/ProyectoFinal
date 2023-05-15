import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoInterface } from '../interfaces/curso-interface';
import { UsuarioInterface } from '../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = 'https://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  //Servicio para obtener todos los cursos
  listaCursos(): Observable<CursoInterface[]>{
    return this.http.get<CursoInterface[]>(`${this.baseUrl}/admin/cursos`);
  }

  //Crear un nuevo curso
  crearCurso(curso: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/admin/addCurso`, curso);
  }

  //Servicio para obtener la lista de monitores
  listaMonitores(): Observable<UsuarioInterface[]>{
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/admin/monitores`);
  }

  //Obtener un monitor por id
  mostrarMonitor(id:number): Observable<UsuarioInterface>{
    return this.http.get<UsuarioInterface>(`${this.baseUrl}/admin/monitor/${id}`);
  }

  //Editar monitor
  editarMonitor(id: number, monitor: UsuarioInterface){
    return this.http.put(`${this.baseUrl}/admin/editarMonitor/${id}`, monitor);
  }
}
