import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosAlumnoService } from 'src/app/services/datos-alumno.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrls: ['./tutor-sidebar.component.scss'],
})
export class TutorSidebarComponent implements OnInit {
  id_alumno: any;
  id_tutor: any;

  constructor(
    private datosUsuario: DatosUsuarioService,
    private datosAlumno: DatosAlumnoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_alumno = this.datosAlumno.id;
    this.id_tutor = this.datosUsuario.id;
  }

  //Borramos los datos del usuario
  logout(): void {
    localStorage.clear();
    this.datosUsuario.id = 0;
    this.datosUsuario.nombre = '';
    this.datosUsuario.apellidos = '';
    this.datosUsuario.email = '';
    this.datosUsuario.telefono = '';

    this.router.navigate(['/']);
  }
}
