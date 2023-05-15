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
  arrayCursosFuturos: Array<CursoInterface> = [];

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //Llamamos al servicio para traer todos los cursos de la BBDD que estén activos
    this.adminService.listaCursos().subscribe({
      next: (cursos) => {
        this.arrayCursos = cursos;

        //Filtramos los cursos por fecha para devolver los activos
        this.arrayCursosActivos = cursos.filter((curso: any) => {
          let fecha_inicio = new Date(curso.fecha_inicio);
          let fecha_fin = new Date(curso.fecha_fin);

          return (
            this.fechaActual >= fecha_inicio && this.fechaActual <= fecha_fin
          );
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarCurso(id: number) {}
}
