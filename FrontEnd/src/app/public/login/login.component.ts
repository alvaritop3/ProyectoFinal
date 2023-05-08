import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredencialesInterface } from 'src/app/interfaces/credencialesInterface';
import { DatosUsuario } from 'src/app/interfaces/datos-usuario';
import { DatosTutorService } from 'src/app/services/datos-tutor.service';
import { LoginService } from 'src/app/services/login.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  //Contenido del botón
  botonName="Login";

  //Formularios
  loginForm!: FormGroup;
  registroForm!: FormGroup;

  //Para controlar el error de autentificarse
  loginIncorrecto:boolean=false;


  //Donde se guardan las credenciales
  credenciales: CredencialesInterface ={
    username: '',
    password: ''
  }

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService, 
    private registroService: RegistroService,
    private router: Router
    
    ) {}

  ngOnInit(): void {
    this.registroForm = this.initFormRegistro();
    this.loginForm = this.initFormLogin();
  }

  cambiar(){
    if(this.botonName=="Login"){
      this.botonName = "Registro";
    }else{
      this.botonName = "Login";
    }
    
  }
  //LLamamos al Servicio para crear un usuario nuevo (tutor)
  registro(): void {
    //Para obtener un valor determinado del formulario:
    //console.log(this.registroForm.value.apellidos)

    const usuario = this.registroForm.value;

    this.registroService.registro(usuario).subscribe((resp) => {
      console.log(resp);
    });
  }

  //LLamamos al Servicio para comprobar el login (devuelve un token)
  login(): void {

    this.credenciales = this.loginForm.value;

    //LLamo al servicio para obtener el token decodificado
    this.loginService.login(this.credenciales).subscribe({
      next:(token) => {
      
      //Obtengo en email
      const email = token.username;

      //Llamo al servicio que me devuelve los datos del usuario que acaba de iniciar sesión según el email y lo almacena en el servicio DatosTutor
      this.loginService.getDatosByEmail(email).subscribe((usuario:any)=>{
        
         localStorage.setItem("id", usuario.id);
         localStorage.setItem("nombre", usuario.name);
        
      })

      //Dependiendo del rol que tenga le hago un navigate diferente
      if (token.roles.includes("ROLE_TUTOR")){
        this.router.navigate(['/tutor']);
      }else if(token.roles.includes("ROLE_MONITOR")){
        this.router.navigate(['/monitor']);
      }else if(token.roles.includes("ROLE_ADMIN")){
        this.router.navigate(['/admin']);
      }     
      
    },
    error:(err)=>{
      this.loginIncorrecto=true;
      console.log("Ha habido un error");
    }
  });
  }

  logout(): void{
    localStorage.clear();
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
    });
  }

  initFormLogin(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
