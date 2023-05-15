import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-crear-monitor',
  templateUrl: './crear-monitor.component.html',
  styleUrls: ['./crear-monitor.component.scss'],
})
export class CrearMonitorComponent implements OnInit {
  //Formulario
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.registroForm = this.initFormRegistro();
  }

  //LLamamos al Servicio para crear un usuario nuevo (monitor)
  registro(): void {
    //Creamos el monitor que se enviará en la petición
    const monitor = this.registroForm.value;
    //Asignamos el rol
    this.registroForm.value.roles = 'ROLE_MONITOR';
    //Llamamos al servicio para registrar al nuevo usuario monitor
    this.registroService.registro(monitor).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/admin/monitores']);
      },
      error: (err) => {
        console.log(err);
      },
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
      fecha_incorp: ['', [Validators.required]],
      roles: [''],
    });
  }
}
