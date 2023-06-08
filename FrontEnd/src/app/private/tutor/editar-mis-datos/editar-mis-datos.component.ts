import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-editar-mis-datos',
  templateUrl: './editar-mis-datos.component.html',
  styleUrls: ['./editar-mis-datos.component.scss'],
})
export class EditarMisDatosComponent implements OnInit {
  //Email del tutor
  tutor_email: string = '';
  //Inicializamos un usuario con los campos vacios
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

  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(
    private tutorService: TutorService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private datosUsuario: DatosUsuarioService
  ) {
    //Recojo el email del tutor
    this.tutor_email = this.route.snapshot.paramMap.get('emailTutor')!;
  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener el monitor por el id
    this.loginService.getDatosByEmail(this.tutor_email).subscribe({
      next: (tutor: UsuarioInterface) => {
        this.tutor = tutor;
      },
      error: (err: any) => {
        this.errorMessage = 'Ha ocurrido un error';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
          this.router.navigate(['/tutor']);
        }, 4000);
      },
    });
  }

  editar() {
    this.tutorService.editarTutor(this.tutor_email, this.tutor).subscribe({
      next: (resp) => {
        this.successMessage = resp;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 4000);
      },
      error: (err) => {
        console.log(err.error);
        this.errorMessage = err;
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigate([`/tutor/miArea/${this.tutor.email}`]);
        }, 4000);
      },
    });
  }
}
