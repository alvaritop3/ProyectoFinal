import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.scss'],
})
export class CrearAlumnoComponent implements OnInit {
  alumnoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tutorService: TutorService
  ) {}

  ngOnInit(): void {
    this.alumnoForm = this.initFormAlumno();
  }

  //LLamamos al servicio para dar de alta a un alumno
  registrarAlumno(): void {
    let datos = {
      nombre: this.alumnoForm.value.nombre,
      apellidos: this.alumnoForm.value.apellidos,
      fecha_nac: this.alumnoForm.value.fecha_nac,
      tutor: 1, //Cambiar por el id del tutor
    };

    this.tutorService.registrarAlumno(JSON.stringify(datos)).subscribe({
      next: (resp) => {
        //Mostrar mensaje de que el alumno se ha creado correctamente
        console.log(resp);
        this.router.navigate(['/tutor']);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
