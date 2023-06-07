import { Component, OnInit } from '@angular/core';
import { AlumnoInterface } from 'src/app/interfaces/alumno-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.component.html',
  styleUrls: ['./ver-alumnos.component.scss'],
})
export class VerAlumnosComponent implements OnInit {
  arrayAlumnos: Array<AlumnoInterface> = [];
  arrayAlumnosFiltrada: Array<AlumnoInterface> = [];
  nombreAlumno!: string;
  errorMessage: string = '';
  showError: boolean = false;
  buscado: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.listaAlumnos().subscribe({
      next: (alumnos) => {
        this.arrayAlumnos = alumnos;
      },
      error: (err) => {
        this.errorMessage =
          'Ha ocurrido un error obteniendo el listado de alumnos';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });
  }

  buscar() {
    //Filtramos el array por nombres o apellidos
    this.arrayAlumnosFiltrada = this.arrayAlumnos.filter(
      (alumno) =>
        alumno.nombre
          .toLowerCase()
          .includes(this.nombreAlumno.toLocaleLowerCase()) ||
        alumno.apellidos
          .toLowerCase()
          .includes(this.nombreAlumno.toLocaleLowerCase())
    );
    this.buscado = true;
  }
}
