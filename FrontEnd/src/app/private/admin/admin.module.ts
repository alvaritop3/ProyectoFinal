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
import { EditarCursosComponent } from './gestionCursos/editar-cursos/editar-cursos.component';
import { HistorialCursosComponent } from './gestionCursos/historial-cursos/historial-cursos.component';
import { VerAlumnosComponent } from './gestionAlumos/ver-alumnos/ver-alumnos.component';
import { EditarAlumnosComponent } from './gestionAlumos/editar-alumnos/editar-alumnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AdminComponent,
    AdminSidebarComponent,
    VerMonitoresComponent,
    DetalleMonitorComponent,
    VerCursosComponent,
    VerMatriculasComponent,
    MisDatosComponent,
    EditarCursosComponent,
    HistorialCursosComponent,
    VerAlumnosComponent,
    EditarAlumnosComponent
  
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
