import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosAlumnoService } from 'src/app/services/datos-alumno.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {

  id_admin!: number;
  constructor(private loginService: LoginService, private datosUsuario: DatosUsuarioService, private datosAlumno: DatosAlumnoService, private router: Router ){
    //Recuperamos el id del usuario
    this.id_admin = this.datosUsuario.id;
  }
  //Borramos los datos del usuario
  logout(): void {

    localStorage.clear();
    this.datosUsuario.id = 0;
    this.datosUsuario.nombre = "";
    this.datosUsuario.apellidos = "";
    this.datosUsuario.email = "";
    this.datosUsuario.telefono ="";

    this.router.navigate(['/']);
    
  }
}
