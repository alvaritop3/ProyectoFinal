import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoInterface } from 'src/app/interfaces/curso-interface';
import { SesionInterface } from 'src/app/interfaces/sesion-interface';
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.scss']
})
export class CursoDetalleComponent {

  id_curso!: any;

  curso: CursoInterface = {
    id: 0,
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    precio: 0,
    estado: '',
    hora: ''
  };

  sesiones: SesionInterface[] = [];

  estado!: string;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private monitorService: MonitorService,
    private route: ActivatedRoute
  )
  {
    //Recojo el id del curso
    this.id_curso = this.route.snapshot.paramMap.get('idCurso');
  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener el curso
    this.monitorService.mostrarCurso(this.id_curso).subscribe({
      next: (curso) => {
        this.curso = curso;
        this.estado = curso.estado;
         
      },
      error: (err) => {
        this.errorMessage = 'Ha ocurrido un error obteniendo los cursos';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });

    //Llamamos a servicio para obtener las sesiones de ese curso
    this.monitorService.listaSesiones(this.id_curso).subscribe({
      next: (sesiones) => {
        this.sesiones = sesiones;
      },
      error: (err) => {
        this.errorMessage = 'Ha ocurrido un error obteniendo las sesiones';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });
  }

}
