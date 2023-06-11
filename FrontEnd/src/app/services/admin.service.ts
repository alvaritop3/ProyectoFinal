import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoInterface } from '../interfaces/curso-interface';
import { UsuarioInterface } from '../interfaces/usuario-interface';
import { SesionInterface } from '../interfaces/sesion-interface';
import { MatriculaInterface } from '../interfaces/matricula-interface';
import { AlumnoInterface } from '../interfaces/alumno-interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'https://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  //Servicio para obtener todos los cursos
  listaCursos(): Observable<CursoInterface[]> {
    return this.http.get<CursoInterface[]>(`${this.baseUrl}/admin/cursos`);
  }

  //Crear un nuevo curso
  crearCurso(curso: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/addCurso`, curso);
  }

  //Detalles del curso
  mostrarCurso(id: number): Observable<CursoInterface> {
    return this.http.get<CursoInterface>(`${this.baseUrl}/admin/curso/${id}`);
  }

  //Cambiar estado de un curso
  cambiarEstadoCurso(id: number, estado: Object): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/admin/cambiarEstadoCurso/${id}`,
      estado
    );
  }

  //Obtener todas las sesiones de un curso
  listaSesiones(id_curso: number): Observable<SesionInterface[]> {
    return this.http.get<SesionInterface[]>(
      `${this.baseUrl}/admin/sesiones/${id_curso}`
    );
  }

  //Servicio para obtener la lista de monitores
  listaMonitores(): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/admin/monitores`);
  }

  //Dar de alta a monitor
  registro(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/crearMonitor`, usuario);
  }
  //Obtener un monitor por id
  mostrarMonitor(id: number): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(
      `${this.baseUrl}/admin/usuario/${id}`
    );
  }

  //Editar monitor
  editarMonitor(id: number, monitor: UsuarioInterface) {
    return this.http.put(`${this.baseUrl}/admin/editarMonitor/${id}`, monitor);
  }

  //Servicio para obtener todas las matriculas
  listaMatriculas(): Observable<MatriculaInterface[]> {
    return this.http.get<MatriculaInterface[]>(
      `${this.baseUrl}/admin/matriculas`
    );
  }

  //Servicio para obtener el detalle de una matricula
  mostrarMatricula(id: number): Observable<MatriculaInterface> {
    return this.http.get<MatriculaInterface>(
      `${this.baseUrl}/admin/matricula/${id}`
    );
  }

  //Servicio para cambiar el estado de una matricula
  cambiarEstadoMatricula(id: number, estado: Object): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/admin/cambiarEstadoMatricula/${id}`,
      estado
    );
  }

  //Servicio para obtener las matriculas que ha gestionado un admin
  listaMatriculasGestionadas(
    id_admin: number
  ): Observable<MatriculaInterface[]> {
    return this.http.get<MatriculaInterface[]>(
      `${this.baseUrl}/admin/matriculasGestionadas/${id_admin}`
    );
  }
  //Servicio para obtener todos los alumnos
  listaAlumnos(): Observable<AlumnoInterface[]> {
    return this.http.get<AlumnoInterface[]>(`${this.baseUrl}/admin/alumnos`);
  }

  //Obtener un alumno por id
  mostrarAlumno(id: number): Observable<AlumnoInterface> {
    return this.http.get<AlumnoInterface>(`${this.baseUrl}/admin/alumno/${id}`);
  }

  //Obtener los datos de un admin por id
  mostrarMisDatos(id: number): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(
      `${this.baseUrl}/admin/misDatos/${id}`
    );
  }
}
