import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private tutorService: TutorService,
    private datosUsuario: DatosUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Recupero el id del tutor del servicio
    this.id_tutor = this.datosUsuario.id;

    //Me aseguro de que tengo el id con el sessionStorage
    if (sessionStorage.getItem('id')) {
      this.id_tutor = sessionStorage.getItem('id');
    }

    this.tutorService.listaDeAlumnos(this.id_tutor).subscribe({
      next: (alumnos) => {
        this.arrayAlumnos = alumnos;
      },
      error: (err) => {
        this.errorMessage = 'Ha ocurrido un error cargando los alumnos';
        this.showError = true;
        setTimeout(() => {
          this.router.navigate(['/tutor']);
          this.showError = false;
        }, 4000);
      },
    });
  }
}
