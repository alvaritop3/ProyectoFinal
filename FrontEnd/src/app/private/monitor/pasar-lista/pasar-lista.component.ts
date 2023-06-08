import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoInterface } from 'src/app/interfaces/alumno-interface';
import { AsistenciaInterface } from 'src/app/interfaces/asistencia-interface';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-pasar-lista',
  templateUrl: './pasar-lista.component.html',
  styleUrls: ['./pasar-lista.component.scss'],
})
export class PasarListaComponent implements OnInit {
  id_sesion!: any;
  arrayAsistencias: Array<AsistenciaInterface> = [];
  errorMessage: string = '';
  showError: boolean = false;
  id_monitor!: any;

  constructor(
    private route: ActivatedRoute,
    private monitorService: MonitorService,
    private router: Router,
    private datosUsuario: DatosUsuarioService
  ) {
    if (this.route.snapshot.paramMap.get('idMonitor')) {
      this.id_monitor = this.route.snapshot.paramMap.get('idMonitor');
    } else {
      this.id_monitor = this.datosUsuario.id;
    }
  }

  ngOnInit(): void {
    //Recojo el id de la sesion
    this.id_sesion = this.route.snapshot.paramMap.get('idSesion');
    //Llamo al servicio para obtener los alumnos de cada sesión
    this.monitorService.listaAsistencia(this.id_sesion).subscribe({
      next: (asistencias) => {
        this.arrayAsistencias = asistencias;
      },
      error: (err) => {
        this.errorMessage =
          'Ha ocurrido un error obteniendo la lista de asistencias de esta sesión';
        this.showError = true;
        setTimeout(() => {
          this.router.navigate(['/monitor/misCursos', this.id_monitor]);
          this.showError = false;
        }, 4000);
      },
    });
  }
}
