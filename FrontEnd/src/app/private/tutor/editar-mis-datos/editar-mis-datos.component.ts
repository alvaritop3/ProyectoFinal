import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-editar-mis-datos',
  templateUrl: './editar-mis-datos.component.html',
  styleUrls: ['./editar-mis-datos.component.scss']
})
export class EditarMisDatosComponent implements OnInit{

//Inicializamos un usuario con los campos vacios
tutor: UsuarioInterface = {
  id: 0,
  nombre: "",
  apellidos: "",
  direccion: "",
  email: "",
  telefono: "",
  roles: [],
  fecha_incorp: ""
};

constructor(
  private tutorService: TutorService,
  private loginService: LoginService,
  private route: ActivatedRoute,
  private router: Router,
  private datosUsuario: DatosUsuarioService
) {
  //Recojo el email del tutor
  this.tutor.email = this.route.snapshot.paramMap.get('emailTutor')!;
}

ngOnInit(): void {
  //** CREAR SERVICIO PARA OBTENER EL USUARIO SEGÚN EL EMAIL */
 //Llamamos al servicio para obtener el monitor por el id
 this.loginService.getDatosByEmail(this.tutor.email).subscribe({
  next: (tutor:UsuarioInterface) => {
    this.tutor = tutor;

  },
  error: (err:any) => {
    console.log(err);
  },
});
}

editar() {

  //Controlar que los campos están introducidos correctamente
  
  // this.tutorService.editarTutor(this.id_tutor, this.tutor).subscribe({
  //   next: (resp)=>{
  //     //Avisar de que los datos se han efectuado correctamente
  //     this.router.navigate(['/tutor/']);

  //   },
  //   error: (err)=>{
  //     console.log(err)
  //   }
  // });
  
  
}



}
