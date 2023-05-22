import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
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
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
