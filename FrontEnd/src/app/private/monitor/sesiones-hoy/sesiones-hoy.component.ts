import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SesionInterface } from 'src/app/interfaces/sesion-interface';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-sesiones-hoy',
  templateUrl: './sesiones-hoy.component.html',
  styleUrls: ['./sesiones-hoy.component.scss'],
})
export class SesionesHoyComponent implements OnInit {
  id_monitor!: any;
  sesiones: Array<SesionInterface> = [];

  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private monitorService: MonitorService
  ) {}

  ngOnInit(): void {
    //Recojo el id del monitor
    this.id_monitor = this.route.snapshot.paramMap.get('idMonitor');

    this.monitorService.sesionesHoy(this.id_monitor).subscribe({
      next: (resp) => {
        this.sesiones = resp;
        this.sesiones = this.sesiones.sort((a: any, b: any) => {
          return a.hora - b.hora;
        });
      },
      error: (err) => {
        console.log('error');
        this.errorMessage = 'Ha ocurrido un error obteniendo las sesiones';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });
  }
}
