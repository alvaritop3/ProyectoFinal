import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editar-monitor',
  templateUrl: './editar-monitor.component.html',
  styleUrls: ['./editar-monitor.component.scss'],
})
export class EditarMonitorComponent implements OnInit {
  //Donde almacenaremos el id del monitor que viene por la ruta
  id_monitor!: any;
  //Inicializamos un usuario con los campos vacios
  monitor: UsuarioInterface = {
    id: 0,
    nombre: '',
    apellidos: '',
    direccion: '',
    email: '',
    telefono: '',
    roles: [],
    fecha_incorp: '',
  };
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //Recojo el id del monitor
    this.id_monitor = this.route.snapshot.paramMap.get('idMonitor');
  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener el monitor por el id
    this.adminService.mostrarMonitor(this.id_monitor).subscribe({
      next: (monitor) => {
        this.monitor = monitor;
      },
      error: (err) => {
        this.errorMessage =
          'Ha ocurrido un error obteniendo los datos del monitor';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });
  }

  editar() {
    this.adminService.editarMonitor(this.id_monitor, this.monitor).subscribe({
      next: (resp) => {
        this.successMessage = 'Monitor modificado correctamente';
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 4000);
      },
      error: (err) => {
        this.errorMessage = 'No se ha podido moidificar el monitor';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/admin/monitores']);
        }, 4000);
      },
    });
  }
}
