import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TutorService } from 'src/app/services/tutor.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.scss'],
})
export class CrearAlumnoComponent implements OnInit {
  alumnoForm!: FormGroup;
  id_tutor!:any;
  selectedFile: File | undefined;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tutorService: TutorService,
    private datosUsuario: DatosUsuarioService
  ) {
    //Recuperamos el id del tutor
    this.id_tutor = this.datosUsuario.id;
  }

  ngOnInit(): void {
    this.alumnoForm = this.initFormAlumno();
    
  }

  //LLamamos al servicio para dar de alta a un alumno
  registrarAlumno(): void {
    
    // let datos = {
    //   nombre: this.alumnoForm.value.nombre,
    //   apellidos: this.alumnoForm.value.apellidos,
    //   fecha_nac: this.alumnoForm.value.fecha_nac,
    //   tutor: this.id_tutor, 
    // };

    const formData = new FormData();
    formData.append('file', this.selectedFile!);
    formData.append('nombre', this.alumnoForm.value.nombre);
    formData.append('apellidos', this.alumnoForm.value.apellidos);
    formData.append('fecha_nac', this.alumnoForm.value.fecha_nac);
    formData.append('tutor', this.id_tutor.toString());

    this.tutorService.registrarAlumno(formData).subscribe({
      next: (resp) => {
        //Mostrar mensaje de que el alumno se ha creado correctamente
        console.log(resp);
        //this.router.navigate(['/tutor']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }


  //Validadores del formulario
  initFormAlumno(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      fecha_nac: ['', [Validators.required]],
    });
  }
}
