import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-historial-cursos',
  templateUrl: './historial-cursos.component.html',
  styleUrls: ['./historial-cursos.component.scss']
})
export class HistorialCursosComponent implements OnInit{

  //Array de todos los cursos que el monitor imparte
  arrayCursos: Array<any> = [];
  id_monitor!: any;
  arrayCursosFinalizados: Array<any> = [];
  fechaActual: Date = new Date();

  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private monitorService: MonitorService,
    private datosUsuario: DatosUsuarioService,
    private route: ActivatedRoute
  ) {
    //Recojo el id del  monitor
    this.id_monitor = this.route.snapshot.paramMap.get('idMonitor');
    this.datosUsuario.id = this.id_monitor;
  }

  ngOnInit(): void {

    this.monitorService.listaCursos(this.id_monitor).subscribe({
      next: (cursos) => {
        this.arrayCursos = cursos;
         //Filtramos los cursos por fecha para devolver finalizados, ordenados de más recientes a más antiguos
         this.arrayCursosFinalizados = this.arrayCursos
         .filter((curso: any) => {
          const fechaFin = new Date(curso.fecha_fin);
          return fechaFin < this.fechaActual;
        })
         .sort((a: any, b: any) => {
           const fechaFinA: any = new Date(a.fecha_fin);
           const fechaFinB: any = new Date(b.fecha_fin);
           return fechaFinB - fechaFinA;
         })
         .sort((a: any, b: any) => {
          return a.hora - b.hora;
        });;
      },
      error: (err) => {
        console.log("error");
        this.errorMessage = 'Ha ocurrido un error obteniendo los cursos';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      }
    });
  }
}
