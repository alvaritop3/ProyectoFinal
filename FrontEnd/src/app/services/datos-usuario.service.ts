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

  constructor() {}
}