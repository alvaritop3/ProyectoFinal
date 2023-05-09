import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { VerCursosComponent } from './gestionCursos/ver-cursos/ver-cursos.component';
import { VerMatriculasComponent } from './gestionMatriculas/ver-matriculas/ver-matriculas.component';
import { VerMonitoresComponent } from './gestionMonitores/ver-monitores/ver-monitores.component';
import { MisDatosComponent } from './gestionMisDatos/mis-datos/mis-datos.component';
import { VerAlumnosComponent } from './gestionAlumos/ver-alumnos/ver-alumnos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children:[
       {path: "", component: VerCursosComponent},
       {path: "matriculas", component: VerMatriculasComponent},
        {path: "monitores", component: VerMonitoresComponent},
        {path: "misDatos", component: MisDatosComponent},
        {path: "alumnos", component: VerAlumnosComponent},

      // {path: "crearAlumno/:idTutor", component: CrearAlumnoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
