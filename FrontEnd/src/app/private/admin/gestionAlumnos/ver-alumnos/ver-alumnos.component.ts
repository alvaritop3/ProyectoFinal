import { Component, OnInit } from '@angular/core';
import { AlumnoInterface } from 'src/app/interfaces/alumno-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.component.html',
  styleUrls: ['./ver-alumnos.component.scss']
})
export class VerAlumnosComponent implements OnInit{
  //Array de alumnos
  arrayAlumnos: Array<AlumnoInterface> = [];

  arrayAlumnosFiltrada: Array<AlumnoInterface> = [];

  nombreAlumno!: string;

  buscado: boolean = false;

constructor(private adminService: AdminService) {}

ngOnInit(): void {
  this.adminService.listaAlumnos().subscribe({
    next: (alumnos) => {
      this.arrayAlumnos = alumnos;
      //console.log(this.arrayAlumnos)
    },
    error: (err) => {
      console.log(err);
    }
  })
}


buscar(){
  //Filtramos el array por nombres o apellidos
  this.arrayAlumnosFiltrada = this.arrayAlumnos.filter(alumno=> 
    alumno.nombre.toLowerCase().includes(this.nombreAlumno.toLocaleLowerCase()) || alumno.apellidos.toLowerCase().includes(this.nombreAlumno.toLocaleLowerCase()));
  console.log(this.arrayAlumnosFiltrada);
  this.nombreAlumno="";
  this.buscado = true;
}


}
