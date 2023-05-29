import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-mi-area',
  templateUrl: './mi-area.component.html',
  styleUrls: ['./mi-area.component.scss'],
})
export class MiAreaComponent implements OnInit {
  tutor: UsuarioInterface = {
    id: 0,
    nombre: '',
    apellidos: '',
    direccion: '',
    email: '',
    telefono: '',
    roles: [],
    fecha_incorp: '',
  };

  constructor(
    private tutorService: TutorService,
    private datosUsuario: DatosUsuarioService,
    private loginService: LoginService
  ) {
    //Recogemos el email del servicio
    this.tutor.email = this.datosUsuario.email;
  }

  ngOnInit(): void {
    //Obtenemos los datos del tutor por el email almacenado en el servicio
    this.loginService.getDatosByEmail(this.tutor.email).subscribe({
      next: (tutor: UsuarioInterface) => {
        this.tutor = tutor;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
