import { Component, OnInit } from '@angular/core';
import { TutorService } from 'src/app/services/tutor.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private tutorService: TutorService,
    private route: ActivatedRoute,
    private datosAlumno: DatosAlumnoService
  ) {
    //Recojo el id del  alumno
    this.id_alumno = this.route.snapshot.paramMap.get('idAlumno');
    this.datosAlumno.id = this.id_alumno;

    //Lo guardo en localStorage
    localStorage.setItem('id_alumno', this.id_alumno);
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
          console.log(resp);
          
          //Crear ventana para mensaje de se ha solicitado correctamente
        },
        error: (err) => {
          console.log(err);
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
