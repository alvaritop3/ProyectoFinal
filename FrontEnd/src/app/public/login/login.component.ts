import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CredencialesInterface } from 'src/app/interfaces/credencialesInterface';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { RegistroService } from 'src/app/services/registro.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Contenido del botón
  botonName: string = 'Ir a Registro';

  //Formularios
  loginForm!: FormGroup;
  registroForm!: FormGroup;

  //Para controlar el error de autentificarse
  loginIncorrecto: boolean = false;

  email: string = '';
  roles: Array<string> = [];

  //Donde se guardan las credenciales
  credenciales: CredencialesInterface = {
    username: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private registroService: RegistroService,
    private router: Router,
    private datosUsuario: DatosUsuarioService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.initFormRegistro();
    this.loginForm = this.initFormLogin();
  }

  cambiar() {
    if (this.botonName == 'Ir a Registro') {
      this.botonName = 'Ir a Login';
    } else {
      this.botonName = 'Ir a Registro';
    }
  }
  //LLamamos al Servicio para crear un usuario nuevo (tutor)
  registro(): void {
    //Para obtener un valor determinado del formulario:
    //console.log(this.registroForm.value.apellidos)

    const usuario = this.registroForm.value;
    this.registroForm.value.roles = 'ROLE_TUTOR';

    this.registroService.registro(usuario).subscribe((resp) => {
      console.log(resp);
    });
  }

  //LLamamos al Servicio para comprobar el login (devuelve un token)
  login(): void {
    this.credenciales = this.loginForm.value;

    //LLamo al servicio para obtener el token decodificado
    this.loginService
      .login(this.credenciales)
      .pipe(
        switchMap((token) => {
          this.email = token.username;
          this.roles = token.roles;

          return this.loginService.getDatosByEmail(this.email);
        })
      )
      .subscribe({
        next:(datos: any) => {
        //Almaceno el id del usuario en el servicio
        this.datosUsuario.id = datos.id;
        this.datosUsuario.nombre = datos.nombre;
        this.datosUsuario.apellidos = datos.apellidos;
        this.datosUsuario.email  =  datos.email;
        this.datosUsuario.telefono = datos.telefono;
        //Almaceno el id en el localStorage
        localStorage.setItem("id", datos.id);
        
        //Dependiendo del rol que tenga le hago un navigate diferente
        if (this.roles.includes('ROLE_TUTOR')) {
          this.router.navigate(['/tutor']);
        } else if (this.roles.includes('ROLE_MONITOR')) {
          this.router.navigate(['/monitor']);
        } else if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        }
      },
      error: (err)=>{
        this.loginIncorrecto = true;
       console.log('Ha habido un error');
      }
      });

  }

  //Validadores de los formularios
  initFormRegistro(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      telefono: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      roles:['']
    });
  }

  initFormLogin(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
