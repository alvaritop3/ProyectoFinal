import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { VerMonitoresComponent } from './gestionMonitores/ver-monitores/ver-monitores.component';
import { DetalleMonitorComponent } from './gestionMonitores/detalle-monitor/detalle-monitor.component';
import { VerCursosComponent } from './gestionCursos/ver-cursos/ver-cursos.component';
import { VerMatriculasComponent } from './gestionMatriculas/ver-matriculas/ver-matriculas.component';
import { MisDatosComponent } from './gestionMisDatos/mis-datos/mis-datos.component';
import { VerAlumnosComponent } from './gestionAlumnos/ver-alumnos/ver-alumnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearCursoComponent } from './gestionCursos/crear-curso/crear-curso.component';
import { CrearMonitorComponent } from './gestionMonitores/crear-monitor/crear-monitor.component';
import { EditarMonitorComponent } from './gestionMonitores/editar-monitor/editar-monitor.component';
import { DetalleCursoComponent } from './gestionCursos/detalle-curso/detalle-curso.component';
import { DetalleMatriculaComponent } from './gestionMatriculas/detalle-matricula/detalle-matricula.component';
import { DetalleAlumnoComponent } from './gestionAlumnos/detalle-alumno/detalle-alumno.component';
import { EditarMisDatosComponent } from './gestionMisDatos/editar-mis-datos/editar-mis-datos.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSidebarComponent,
    VerMonitoresComponent,
    DetalleMonitorComponent,
    VerCursosComponent,
    VerMatriculasComponent,
    MisDatosComponent,
    VerAlumnosComponent,
    CrearCursoComponent,
    CrearMonitorComponent,
    EditarMonitorComponent,
    DetalleCursoComponent,
    DetalleMatriculaComponent,
    DetalleAlumnoComponent,
    EditarMisDatosComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
