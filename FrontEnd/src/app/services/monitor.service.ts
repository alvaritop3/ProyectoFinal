import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoInterface } from '../interfaces/curso-interface';
import { SesionInterface } from '../interfaces/sesion-interface';
import { AsistenciaInterface } from '../interfaces/asistencia-interface';
import { AlumnoInterface } from '../interfaces/alumno-interface';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  baseUrl = 'https://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  //Servicio para obtener todos los cursos que imparte el monitor
  listaCursos(idMonitor: number): Observable<CursoInterface[]> {
    return this.http.get<CursoInterface[]>(
      `${this.baseUrl}/monitor/cursos/${idMonitor}`
    );
  }
  //Detalles del curso
  mostrarCurso(idCurso: number): Observable<CursoInterface> {
    return this.http.get<CursoInterface>(
      `${this.baseUrl}/monitor/curso/${idCurso}`
    );
  }

  //Obtener todas las sesiones de un curso
  listaSesiones(idCurso: number): Observable<SesionInterface[]> {
    return this.http.get<SesionInterface[]>(
      `${this.baseUrl}/monitor/sesiones/${idCurso}`
    );
  }

  //Obtener las sesiones de hoy
  sesionesHoy(idMonitor: number): Observable<SesionInterface[]> {
    return this.http.get<SesionInterface[]>(
      `${this.baseUrl}/monitor/sesionesHoy/${idMonitor}`
    );
  }

  //Servicio para obtener todas las asistencias de una sesion
  listaAsistencia(idSesion: number): Observable<AsistenciaInterface[]> {
    return this.http.get<AsistenciaInterface[]>(
      `${this.baseUrl}/monitor/asistenciaDeSesion/${idSesion}`
    );
  }
  //Modificar asistencia
  editarAsistencia(asistencia: AsistenciaInterface) {
    return this.http.put(
      `${this.baseUrl}/monitor/editarAsistencia/${asistencia.id}`,
      asistencia
    );
  }
  //Obtenemos alumno por id
  alumnoPorId(idAlumno: number): Observable<AlumnoInterface> {
    return this.http.get<AlumnoInterface>(
      `${this.baseUrl}/monitor/alumno/${idAlumno}`
    );
  }
}
