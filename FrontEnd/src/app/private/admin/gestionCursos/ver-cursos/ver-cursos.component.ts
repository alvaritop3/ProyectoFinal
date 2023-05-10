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

  //Formularios
  cursoNuevoForm!: FormGroup;


  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //Inicializamos el formulario reactivo
    this.cursoNuevoForm = this.initFormCursoNuevo();


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
      },
    });
  }

  //Función para crear un curso nuevo
  crearCurso() {
    
    let nuevoCurso = {
      nombre: this.cursoNuevoForm.value.nombre,
      fecha_inicio: this.cursoNuevoForm.value.fecha_inicio,
      fecha_fin: this.cursoNuevoForm.value.nombre.fecha_fin,
      precio: this.cursoNuevoForm.value.nombre.precio,
      estado: "sin empezar"
    }
    //this.adminService.crearCurso(nuevoCurso).subscribe();
    console.log("Hola");
  }

  editarCurso(id: number){

  }


  //Validadores del formulario
  initFormCursoNuevo():FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha_inicio: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      fecha_fin:['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      precio:['', [Validators.required, Validators.minLength(3)]]
    })
  }
}
