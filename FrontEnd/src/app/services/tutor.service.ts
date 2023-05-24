import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosAlumnoService } from './datos-alumno.service';
import { MatriculaInterface } from '../interfaces/matricula-interface';
import { MatriculaInterfaceTutor } from '../interfaces/matricula-interface-tutor';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  baseUrl = 'https://127.0.0.1:8000';

  constructor(
    private http: HttpClient,
    private datosAlumno: DatosAlumnoService
  ) {}

  //Servicio para obtener la lista de alumnos de un tutor
  listaDeAlumnos(id: number): Observable<any> {
    //Observable<alumno[]>
    return this.http.get<any[]>(`${this.baseUrl}/tutor/getAlumnos/${id}`);
  }

  //Añadir un alumno al tutor
  registrarAlumno(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tutor/addAlumno`, datos);
  }

  //Modificar a alumno
  modificarAlumno(datos: any): Observable<any> {
    //Tengo que pasarle en el path el id del alumno /id
    const id_alumno = this.datosAlumno.id;

    return this.http.put(
      `${this.baseUrl}/tutor/editAlumno/${id_alumno}`,
      datos
    );
  }

  //Mostrar los cursos disponibles para un alumno
  mostrarCursosDisponibles(id_alumno: number): Observable<any> {
    //Observable<curso[]>
    return this.http.get(`${this.baseUrl}/tutor/cursosDisp/${id_alumno}`);
  }

  //Solicitar matriculación
  solicitarMatricula(datosMatricula: any): Observable<any> {
    //Observable<matricula>

    return this.http.post(
      `${this.baseUrl}/tutor/solicitarMatricula`,
      datosMatricula
    );
  }

  //Mostrar matriculas realizadas
  mostrarMatriculas(idAlumno: number): Observable<MatriculaInterface[]> {
    return this.http.get<MatriculaInterface[]>(
      `${this.baseUrl}/tutor/matriculas/${idAlumno}`
    );
  }

}
