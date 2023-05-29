import { Component, OnInit } from '@angular/core';
import { AlumnoInterface } from 'src/app/interfaces/alumno-interface';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-mostrar-alumnos',
  templateUrl: './mostrar-alumnos.component.html',
  styleUrls: ['./mostrar-alumnos.component.scss'],
})
export class MostrarAlumnosComponent implements OnInit {
  arrayAlumnos: Array<AlumnoInterface> = [];
  id_tutor!: any;

  constructor(
    private tutorService: TutorService,
    private datosUsuario: DatosUsuarioService
  ) {}

  ngOnInit(): void {
    //Recupero el id del tutor del servicio
    this.id_tutor = this.datosUsuario.id;

    //Me aseguro de que tengo el id con el localStorage
    if (localStorage.getItem('id')) {
      this.id_tutor = localStorage.getItem('id');
    }

    this.tutorService.listaDeAlumnos(this.id_tutor).subscribe({
      next: (alumnos) => {
        this.arrayAlumnos = alumnos;
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
