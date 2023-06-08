import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosUsuarioService {
  id!: number;
  nombre!: string;
  email!: string;
  apellidos!: string;
  telefono!: string;

  constructor() {
    this.id = Number(sessionStorage.getItem('id'));
    this.email = String(sessionStorage.getItem('email'));
  }
}
