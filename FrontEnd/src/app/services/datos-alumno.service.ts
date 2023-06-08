import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosAlumnoService {
  id!: number;
  nombre: string = '';
  apellidos: string = '';
  fecha_nac: string = '';

  constructor() {
    this.id = Number(localStorage.getItem('id_alumno'));
  }
}
