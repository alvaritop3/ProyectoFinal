import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatosAlumnoService } from 'src/app/services/datos-alumno.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(
    private datosUsuario: DatosUsuarioService,
    private datosAlumno: DatosAlumnoService,
    private router: Router
  ) {}
  //Borramos los datos del usuario
  logout(): void {
    sessionStorage.clear();
    this.datosUsuario.id = 0;
    this.datosUsuario.nombre = '';
    this.datosUsuario.apellidos = '';
    this.datosUsuario.email = '';
    this.datosUsuario.telefono = '';

    this.datosAlumno.id = 0;

    this.router.navigate(['/']);
  }
}
