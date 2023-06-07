import { Component, Input, OnInit } from '@angular/core';
import { AlumnoInterface } from 'src/app/interfaces/alumno-interface';
import { AsistenciaInterface } from 'src/app/interfaces/asistencia-interface';
import { SesionInterface } from 'src/app/interfaces/sesion-interface';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-lista-detalle',
  templateUrl: './lista-detalle.component.html',
  styleUrls: ['./lista-detalle.component.scss'],
})
export class ListaDetalleComponent implements OnInit {
  //Recojo el alumno del padre
  @Input() asistencia!: AsistenciaInterface;
  @Input() sesion!: SesionInterface;
  motivo: string = '';
  asiste: string = '';
  formDes: boolean = false;
  alumno: AlumnoInterface = {
    id: 0,
    nombre: '',
    apellidos: '',
    fecha_nac: '',
    tutor_nombre: '',
    tutor_id: 0,
    foto: '',
  };
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(private monitorService: MonitorService) {}
  ngOnInit(): void {
    this.asiste = this.asistencia.asiste.toLowerCase();
    this.motivo = this.asistencia.motivo;
    this.monitorService
      .alumnoPorId(parseInt(this.asistencia.alumno_id))
      .subscribe({
        next: (alumno) => {
          this.alumno = alumno;
        },
        error: (err) => {
          this.errorMessage =
            'Ha ocurrido un error obteniendo los datos del alumno';
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 4000);
        },
      });
  }

  guardar() {
    let textMotivo = document.getElementById('motivo') as HTMLTextAreaElement;
    this.motivo = textMotivo.value;
    this.asistencia.motivo = this.motivo;
    this.asistencia.asiste = this.asiste;
    //Deshabilitamos los inputs
    this.formDes = true;
    //Llamamos al servicio para modificar la asistencia
    this.monitorService.editarAsistencia(this.asistencia).subscribe({
      next: (resp) => {
        this.successMessage = 'Asistencia editada correctamente';
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 4000);
      },
      error: (err) => {
        this.errorMessage = 'Ha ocurrido un error actualizando la asistencia';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });
  }
}
