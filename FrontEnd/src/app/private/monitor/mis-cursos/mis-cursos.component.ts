import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.scss'],
})
export class MisCursosComponent implements OnInit {
  //Array de todos los cursos que el monitor imparte
  arrayCursos: Array<any> = [];
  id_monitor!: any;
  arrayCursosActivos: Array<any> = [];
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
        //Filtramos los cursos por fecha para devolver los activos, ordenamos de fecha más próxima a más lejana y de menor a mayor hora
        this.arrayCursosActivos = cursos
          .filter((curso: any) => {
            let fecha_inicio = new Date(curso.fecha_inicio);
            let fecha_fin = new Date(curso.fecha_fin);

            return (
              this.fechaActual >= fecha_inicio && this.fechaActual <= fecha_fin
            );
          })
          .sort((a: any, b: any) => {
            let fechaInicioA: any = new Date(a.fecha_inicio);
            let fechaInicioB: any = new Date(b.fecha_inicio);

            return fechaInicioA - fechaInicioB;
          })
          .sort((a: any, b: any) => {
            return a.hora - b.hora;
          });
      },
      error: (err) => {
        console.log('error');
        this.errorMessage = 'Ha ocurrido un error obteniendo los cursos';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });
  }
}
