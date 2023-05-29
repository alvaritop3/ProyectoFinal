import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorComponent } from './tutor.component';
import { MostrarAlumnosComponent } from './mostrar-alumnos/mostrar-alumnos.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { MostrarCursosComponent } from './mostrar-cursos/mostrar-cursos.component';
import { HistorialCursosComponent } from './historial-cursos/historial-cursos.component';
import { MostrarMatriculasComponent } from './mostrar-matriculas/mostrar-matriculas.component';
import { MiAreaComponent } from './mi-area/mi-area.component';
import { EditarMisDatosComponent } from './editar-mis-datos/editar-mis-datos.component';



const routes: Routes = [
  {
    path: '',
    component: TutorComponent,
    children:[
      {path: "", component: MostrarAlumnosComponent},
      {path: "cursos/:idAlumno", component: MostrarCursosComponent},
      {path: "historialCursos/:idAlumno", component: HistorialCursosComponent},
      {path: "crearAlumno/:idTutor", component: CrearAlumnoComponent},
      {path: "mostrarMatriculas/:idAlumno", component: MostrarMatriculasComponent},
      {path: "miArea/:idTutor", component: MiAreaComponent},
      {path: "editarMisDatos/:emailTutor", component: EditarMisDatosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule { }
