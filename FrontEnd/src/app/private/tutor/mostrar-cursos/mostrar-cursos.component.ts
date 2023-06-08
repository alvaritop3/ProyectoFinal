import { Component, OnInit } from '@angular/core';
import { TutorService } from 'src/app/services/tutor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosAlumnoService } from 'src/app/services/datos-alumno.service';

@Component({
  selector: 'app-mostrar-cursos',
  templateUrl: './mostrar-cursos.component.html',
  styleUrls: ['./mostrar-cursos.component.scss'],
})
export class MostrarCursosComponent implements OnInit {
  //Array de todos los cursos donde el alumno no se ha matriculado
  arrayCursos: Array<any> = [];
  //Array de todos los cursos donde el alumno no se ha matriculado y no han comenzado según la fecha actual
  arrayCursosActivos: Array<any> = [];
  //Fecha actual
  fechaActual: Date = new Date();

  id_alumno!: any;
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(
    private tutorService: TutorService,
    private route: ActivatedRoute,
    private datosAlumno: DatosAlumnoService,
    private router: Router
  ) {
    //Recojo el id del  alumno
    this.id_alumno = this.route.snapshot.paramMap.get('idAlumno');
    this.datosAlumno.id = this.id_alumno;

    //Lo guardo en sessionStorage
    sessionStorage.setItem('id_alumno', this.id_alumno);
  }

  ngOnInit(): void {
    this.cursosDisponibles();
  }

  solicitarMatricula(cursoId: number) {
    //Creamos el body de la petición
    let datosMatricula = {
      id_curso: cursoId,
      id_alumno: this.id_alumno,
    };

    //Llamamos al servicio
    this.tutorService
      .solicitarMatricula(JSON.stringify(datosMatricula))
      .subscribe({
        next: (resp) => {
          this.successMessage = 'La matricula se ha solicitado correctamente';
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 4000);
        },
        error: (err) => {
          this.errorMessage = 'Ha ocurrido un error solicitando la matrícula';
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 4000);
        },
        complete: () => {
          setTimeout(() => {
            this.router.navigate([`/tutor/cursos/${this.id_alumno}`]);
          }, 4000);
        },
      });

    //Llamamos de nuevo a la función para que actualice la tabla de cursos
    this.cursosDisponibles();
  }

  cursosDisponibles() {
    //Este servicio devuelve los cursos en los que el alumno aún no se ha matriculado
    this.tutorService.mostrarCursosDisponibles(this.id_alumno).subscribe({
      next: (cursos) => {
        this.arrayCursos = cursos;

        //Filtramos los cursos por fecha para devolver los activos y ordenamos de fecha más próxima a más lejana
        this.arrayCursosActivos = cursos
          .filter((curso: any) => {
            let fecha_inicio = new Date(curso.fecha_inicio);
            let fecha_fin = new Date(curso.fecha_fin);

            return (
              this.fechaActual >= fecha_inicio && this.fechaActual <= fecha_fin
            );
          })
          .sort((a: any, b: any) => {
            let fechaInicioA: any = new Date(a.fecha_inicio);
            let fechaInicioB: any = new Date(b.fecha_inicio);

            return fechaInicioA - fechaInicioB;
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
