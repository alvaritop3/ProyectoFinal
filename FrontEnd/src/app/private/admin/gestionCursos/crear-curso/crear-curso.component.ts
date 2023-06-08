import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.scss'],
})
export class CrearCursoComponent implements OnInit {
  //Formularios
  cursoNuevoForm!: FormGroup;
  //Array donde se almacenan los monitores
  arrayMonitores: Array<UsuarioInterface> = [];

  //Boolean para controlar el envio
  envioOk: boolean = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Inicializamos el formulario reactivo
    this.cursoNuevoForm = this.initFormCursoNuevo();

    //Llamamos al servicio para traer a todos los monitores
    this.adminService.listaMonitores().subscribe({
      next: (monitores) => {
        this.arrayMonitores = monitores;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Función para crear un curso nuevo
  crearCurso() {
    let nuevoCurso = {
      nombre: this.cursoNuevoForm.value.nombre,
      fecha_inicio: this.cursoNuevoForm.value.fecha_inicio,
      fecha_fin: this.cursoNuevoForm.value.fecha_fin,
      estado: 'sin empezar',
      monitor: this.cursoNuevoForm.value.monitor,
      tipo: this.cursoNuevoForm.value.tipo,
      hora: this.cursoNuevoForm.value.hora,
    };

    this.adminService.crearCurso(nuevoCurso).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Validadores del formulario
  initFormCursoNuevo(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha_inicio: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      fecha_fin: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      monitor: [['', Validators.required, Validators.minLength(2)]],
      tipo: new FormControl(),
      hora: new FormControl(),
    });
  }
}
