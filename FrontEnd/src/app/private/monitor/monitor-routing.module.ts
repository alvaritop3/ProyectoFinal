import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor.component';
import { MisCursosComponent } from './mis-cursos/mis-cursos.component';
import { HistorialCursosComponent } from './historial-cursos/historial-cursos.component';
import { MiAreaComponent } from './mi-area/mi-area.component';
import { CursoDetalleComponent } from './curso-detalle/curso-detalle.component';
import { PasarListaComponent } from './pasar-lista/pasar-lista.component';
import { SesionesHoyComponent } from './sesiones-hoy/sesiones-hoy.component';


const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children:[
       {path: "misCursos/:idMonitor", component: MisCursosComponent},
       {path: "historialCursos/:idMonitor", component: HistorialCursosComponent},
      {path: "miArea/:idMonitor", component: MiAreaComponent},
      {path: "detalleCurso/:idCurso", component: CursoDetalleComponent},
      {path: "pasarLista/:idSesion", component: PasarListaComponent},
      {path: "sesionesHoy/:idMonitor", component: SesionesHoyComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
