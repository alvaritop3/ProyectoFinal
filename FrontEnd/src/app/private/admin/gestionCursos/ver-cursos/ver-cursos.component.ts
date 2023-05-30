import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoInterface } from 'src/app/interfaces/curso-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ver-cursos',
  templateUrl: './ver-cursos.component.html',
  styleUrls: ['./ver-cursos.component.scss'],
})
export class VerCursosComponent implements OnInit {
  //Array de todos los cursos
  arrayCursos: Array<CursoInterface> = [];
  //Fecha actual
  fechaActual: Date = new Date();

  //Array de cursos
  arrayCursosActivos: Array<CursoInterface> = [];
  arrayCursosFinalizados: Array<CursoInterface> = [];

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //Llamamos al servicio para traer todos los cursos de la BBDD que estén activos
    this.adminService.listaCursos().subscribe({
      next: (cursos) => {
        this.arrayCursos = cursos;

        //Ordenamos de más recientes a mas antiguos
        this.arrayCursos = this.arrayCursos.sort((a: any, b: any) => {
          let fechaInicioA: any = new Date(a.fecha_inicio);
          let fechaInicioB: any = new Date(b.fecha_inicio);

          return fechaInicioB - fechaInicioA;
        });

        //Filtramos los cursos por fecha para devolver los activos (los que se están impartiendo y los que van a comenzar)
        this.arrayCursosActivos = this.arrayCursos
          .filter((curso: any) => {
            let fecha_fin = new Date(curso.fecha_fin);
            return this.fechaActual <= fecha_fin;
          })
          .sort((a: any, b: any) => {
            let fechaInicioA: any = new Date(a.fecha_inicio);
            let fechaInicioB: any = new Date(b.fecha_inicio);

            return fechaInicioA - fechaInicioB;
          });

        //Filtramos los cursos para devolver aquellos que ya han finalizado
        this.arrayCursosFinalizados = this.arrayCursos
          .filter((curso: any) => {
            const fechaFin = new Date(curso.fecha_fin);
            return fechaFin < this.fechaActual;
          })
          .sort((a: any, b: any) => {
            const fechaFinA: any = new Date(a.fecha_fin);
            const fechaFinB: any = new Date(b.fecha_fin);
            return fechaFinB - fechaFinA;
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
