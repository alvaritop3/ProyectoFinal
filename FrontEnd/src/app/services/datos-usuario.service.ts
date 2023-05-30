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
    this.id = Number(localStorage.getItem('id'));
    this.email = String(localStorage.getItem('email'));
  }
}
