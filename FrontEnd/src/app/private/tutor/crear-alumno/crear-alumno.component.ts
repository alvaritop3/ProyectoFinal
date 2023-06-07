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
  id_tutor!: any;
  selectedFile: File | undefined;

  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

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
    const formData = new FormData();
    formData.append('file', this.selectedFile!);
    formData.append('nombre', this.alumnoForm.value.nombre);
    formData.append('apellidos', this.alumnoForm.value.apellidos);
    formData.append('fecha_nac', this.alumnoForm.value.fecha_nac);
    formData.append('tutor', this.id_tutor.toString());

    this.tutorService.registrarAlumno(formData).subscribe({
      next: (resp) => {
        this.successMessage = 'Alumno dado de alta correctamente';
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 4000);
      },
      error: (err) => {
        this.errorMessage =
          'No se ha podido dar de alta al alumno, intentelo de nuevo más tarde';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/tutor']);
        }, 4000);
      },
    });
  }

  onFileSelected(event: any) {
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
