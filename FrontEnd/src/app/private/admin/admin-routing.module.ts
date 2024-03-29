import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { VerCursosComponent } from './gestionCursos/ver-cursos/ver-cursos.component';
import { VerMatriculasComponent } from './gestionMatriculas/ver-matriculas/ver-matriculas.component';
import { VerMonitoresComponent } from './gestionMonitores/ver-monitores/ver-monitores.component';
import { MisDatosComponent } from './gestionMisDatos/mis-datos/mis-datos.component';
import { VerAlumnosComponent } from './gestionAlumnos/ver-alumnos/ver-alumnos.component';
import { CrearCursoComponent } from './gestionCursos/crear-curso/crear-curso.component';
import { CrearMonitorComponent } from './gestionMonitores/crear-monitor/crear-monitor.component';
import { EditarMonitorComponent } from './gestionMonitores/editar-monitor/editar-monitor.component';
import { DetalleMonitorComponent } from './gestionMonitores/detalle-monitor/detalle-monitor.component';
import { DetalleCursoComponent } from './gestionCursos/detalle-curso/detalle-curso.component';
import { DetalleMatriculaComponent } from './gestionMatriculas/detalle-matricula/detalle-matricula.component';
import { DetalleAlumnoComponent } from './gestionAlumnos/detalle-alumno/detalle-alumno.component';
import { EditarMisDatosComponent } from './gestionMisDatos/editar-mis-datos/editar-mis-datos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: VerCursosComponent },
      { path: 'crearCurso', component: CrearCursoComponent },
      { path: 'detalleCurso/:idCurso', component: DetalleCursoComponent },
      { path: 'matriculas', component: VerMatriculasComponent },
      {
        path: 'detalleMatricula/:idMatricula',
        component: DetalleMatriculaComponent,
      },
      { path: 'monitores', component: VerMonitoresComponent },
      { path: 'crearMonitor', component: CrearMonitorComponent },
      { path: 'detalleMonitor/:idMonitor', component: DetalleMonitorComponent },
      { path: 'editarMonitor/:idMonitor', component: EditarMonitorComponent },
      { path: 'misDatos/:idAdmin', component: MisDatosComponent },
      { path: 'editarMisDatos/:idAdmin', component: EditarMisDatosComponent },
      { path: 'alumnos', component: VerAlumnosComponent },
      { path: 'detalleAlumno/:idAlumno', component: DetalleAlumnoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
