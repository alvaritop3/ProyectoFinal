import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorComponent } from './tutor.component';
import { MostrarAlumnosComponent } from './mostrar-alumnos/mostrar-alumnos.component';
import { TutorSidebarComponent } from './tutor-sidebar/tutor-sidebar.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { MostrarCursosComponent } from './mostrar-cursos/mostrar-cursos.component';
import { HistorialCursosComponent } from './historial-cursos/historial-cursos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TutorComponent,
    MostrarAlumnosComponent,
    TutorSidebarComponent,
    CrearAlumnoComponent,
    MostrarCursosComponent,
    HistorialCursosComponent,
   
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TutorModule { }
