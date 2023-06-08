import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-mi-area',
  templateUrl: './mi-area.component.html',
  styleUrls: ['./mi-area.component.scss'],
})
export class MiAreaComponent implements OnInit {
  id_monitor!: any;
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  monitor: UsuarioInterface = {
    id: 0,
    nombre: '',
    apellidos: '',
    direccion: '',
    email: '',
    telefono: '',
    roles: [],
    fecha_incorp: '',
    foto: '',
  };
  constructor(
    private monitorService: MonitorService,
    private route: ActivatedRoute,
    private datosUsuario: DatosUsuarioService,
    private router: Router
  ) {
    if (this.route.snapshot.paramMap.get('idMonitor')) {
      this.id_monitor = this.route.snapshot.paramMap.get('idMonitor');
    } else {
      this.id_monitor = this.datosUsuario.id;
    }
  }

  ngOnInit(): void {
    this.monitorService.mostrarMisDatos(this.id_monitor).subscribe({
      next: (monitor) => {
        this.monitor = monitor;
      },
      error: (err) => {
        this.errorMessage = 'Ha ocurrido un error obteniendo los datos';
        this.showError = true;
        setTimeout(() => {
          this.router.navigate(['/monitor/misCursos', this.id_monitor]);
          this.showError = false;
        }, 4000);
      },
    });
  }

  modificarDatos() {
    this.monitorService
      .editarMisDatos(this.id_monitor, this.monitor)
      .subscribe({
        next: (resp) => {
          this.successMessage = 'Datos modificados correctamente';
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false;
          }, 4000);
        },
        error: (err) => {
          this.errorMessage = 'Ha ocurrido un error modificando los datos';
          this.showError = true;
          setTimeout(() => {
            // this.router.navigate(['/monitor/misCursos', this.id_monitor]);
            this.showError = false;
          }, 4000);
        },
      });
  }
}
