import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoInterface } from 'src/app/interfaces/alumno-interface';
import { AdminService } from 'src/app/services/admin.service';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss'],
})
export class DetalleAlumnoComponent implements OnInit {
  //Donde almacenaremos el id del alumno que viene por la ruta
  id_alumno!: any;
  //Almacenamos los datos del alumno
  alumno: AlumnoInterface = {
    id: 0,
    nombre: '',
    apellidos: '',
    fecha_nac: '',
    tutor_nombre: '',
    tutor_id: 0,
    foto: '',
  };
  //Almacenamos los datos del tutor
  tutor: UsuarioInterface = {
    id: 0,
    nombre: '',
    apellidos: '',
    direccion: '',
    email: '',
    telefono: '',
    roles: [],
  };
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id_alumno = this.route.snapshot.paramMap.get('idAlumno');
  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener el alumno por el id
    this.adminService.mostrarAlumno(this.id_alumno).subscribe({
      next: (alumno) => {
        this.alumno = alumno;

        //Llamamos al servicio para obtener los datos del tutor
        this.adminService.mostrarMonitor(this.alumno.tutor_id).subscribe({
          next: (tutor) => {
            this.tutor = tutor;
          },
          error: (err) => {
            this.errorMessage =
              'Ha ocurrido un error obteniendo los datos del tutor';
            this.showError = true;
            setTimeout(() => {
              this.showError = false;
              this.router.navigate(['/admin']);
            }, 4000);
          },
        });
      },
      error: (err) => {
        this.errorMessage =
          'Ha ocurrido un error obteniendo los datos del alumno';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
          this.router.navigate(['/admin']);
        }, 4000);
      },
    });
  }
}
