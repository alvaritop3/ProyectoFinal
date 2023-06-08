import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatriculaInterface } from 'src/app/interfaces/matricula-interface';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-mostrar-matriculas',
  templateUrl: './mostrar-matriculas.component.html',
  styleUrls: ['./mostrar-matriculas.component.scss'],
})
export class MostrarMatriculasComponent implements OnInit {
  idAlumno: any = 0;
  //Array donde almacenamos las matriculas
  arrayMatriculas: Array<MatriculaInterface> = [];
  arrayMatriculasOrdenadas: Array<MatriculaInterface> = [];

  constructor(
    private tutorService: TutorService,
    private route: ActivatedRoute
  ) {
    //Recogemos el id del alumno
    this.idAlumno = this.route.snapshot.paramMap.get('idAlumno');
  }

  ngOnInit(): void {
    this.tutorService.mostrarMatriculas(this.idAlumno).subscribe({
      next: (matriculas) => {
        this.arrayMatriculas = matriculas;
        this.arrayMatriculasOrdenadas = this.arrayMatriculas.sort(
          (a: any, b: any) => {
            return a.estado.localeCompare(b.estado);
          }
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  recientes() {
    this.arrayMatriculasOrdenadas = this.arrayMatriculas.sort(
      (a: any, b: any) => {
        let fechaA: any = new Date(a.fecha);
        let fechaB: any = new Date(b.fecha);

        return fechaB - fechaA;
      }
    );
  }

  antiguas() {
    this.arrayMatriculasOrdenadas = this.arrayMatriculas.sort(
      (a: any, b: any) => {
        let fechaA: any = new Date(a.fecha);
        let fechaB: any = new Date(b.fecha);

        return fechaA - fechaB;
      }
    );
  }

  estado() {
    this.arrayMatriculasOrdenadas = this.arrayMatriculas.sort(
      (a: any, b: any) => {
        return a.estado.localeCompare(b.estado);
      }
    );
  }
}
