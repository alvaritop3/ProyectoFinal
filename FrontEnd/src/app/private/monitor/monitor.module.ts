import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { MonitorSidebarComponent } from './monitor-sidebar/monitor-sidebar.component';
import { HistorialCursosComponent } from './historial-cursos/historial-cursos.component';
import { MiAreaComponent } from './mi-area/mi-area.component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { PasarListaComponent } from './pasar-lista/pasar-lista.component';
import { SesionesHoyComponent } from './sesiones-hoy/sesiones-hoy.component';


@NgModule({
  declarations: [
    MonitorComponent,
    MisCursosComponent,
    MonitorSidebarComponent,
    HistorialCursosComponent,
    MiAreaComponent,
    CursoDetalleComponent,
    PasarListaComponent,
    SesionesHoyComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
