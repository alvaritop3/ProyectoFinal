import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CursoInterface } from 'src/app/interfaces/curso-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ver-cursos',
  templateUrl: './ver-cursos.component.html',
  styleUrls: ['./ver-cursos.component.scss'],
})
export class VerCursosComponent implements OnInit {
  arrayCursos: Array<CursoInterface> = [];
  fechaActual: Date = new Date();

  arrayCursosActivos: Array<CursoInterface> = [];
  arrayCursosFinalizados: Array<CursoInterface> = [];
  arrayCursosFuturos: Array<CursoInterface> = [];

  cursoNuevo:any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.listaCursos().subscribe({
      next: (cursos) => {
        this.arrayCursos = cursos;

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
      },
    });
  }

  crearCurso() {
    //this.adminService.crearCurso(this.cursoNuevo).subscribe();
    
  }

  editarCurso(id: number){
    
  }
}
