import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.registroForm = this.initFormRegistro();
    this.loginForm = this.initFormLogin();
  }

  //LLamamos al Servicio para crear un usuario nuevo (tutor)
  registro(): void {
    //Para obtener un valor determinado del formulario:
    //console.log(this.registroForm.value.apellidos)

    const usuario = this.registroForm.value;

    this.loginService.registro(usuario).subscribe((resp) => {
      console.log(resp);
    });
  }

  //LLamamos al Servicio para comprobar el login (devuelve un token)
  login(): void {
    const credenciales = this.loginForm.value;

    this.loginService.login(credenciales).subscribe((resp) => {
      //Para obtener el token
      //console.log(resp.token);
      //console.log(resp);
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
    });
  }

  initFormLogin(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
