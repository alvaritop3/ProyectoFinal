import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TutorService {
    
  baseUrl = "https://127.0.0.1:8000";

  constructor(private http: HttpClient) { 
    
  }

  //Servicio para obtener la lista de alumnos de un tutor
  listaDeAlumnos(id: number): Observable<any>{
    
    return this.http.get<any[]>(`${this.baseUrl}/tutor/getAlumnos/${id}`);
  }

  //Añadir un alumno al tutor
  registrarAlumno(datos: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/tutor/addAlumno`, datos);
  }
  
  //Mostrar los cursos disponibles
  mostrarCursos(): Observable<any>{
    return this.http.get(`${this.baseUrl}/cursos`);
  }

}
