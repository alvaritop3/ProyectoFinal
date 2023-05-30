import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoInterface } from 'src/app/interfaces/curso-interface';
import { DatosAlumnoService } from 'src/app/services/datos-alumno.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-historial-cursos',
  templateUrl: './historial-cursos.component.html',
  styleUrls: ['./historial-cursos.component.scss'],
})
export class HistorialCursosComponent implements OnInit {
  arrayHistorialCursos: Array<CursoInterface> = [];
  id_alumno: any;

  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private tutorService: TutorService,
    private datosAlumno: DatosAlumnoService
  ) {
    this.id_alumno = this.datosAlumno.id;
  }

  ngOnInit(): void {
    //Llamamos al servicio para recuperar todos los cursos donde el alumno se ha matriculado
    this.tutorService.verHistorial(this.id_alumno).subscribe({
      next: (resp) => {
        this.arrayHistorialCursos = resp;
        //Ordenamos los cursos de más recientes a más antiguos
        this.arrayHistorialCursos = this.arrayHistorialCursos.sort((a: any, b: any) => {
          let fechaInicioA: any = new Date(a.fecha_inicio);
          let fechaInicioB: any = new Date(b.fecha_inicio);

          return fechaInicioB - fechaInicioA;
        });
        
      },
      error: (err) => {
        this.errorMessage = "Ha ocurrido un error mostrando el historial de cursos, vuelva a Inicio";
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
      complete: () => {},
    });
  }
}
