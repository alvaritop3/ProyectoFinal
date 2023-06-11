import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-crear-monitor',
  templateUrl: './crear-monitor.component.html',
  styleUrls: ['./crear-monitor.component.scss'],
})
export class CrearMonitorComponent implements OnInit {
  //Formulario
  registroForm!: FormGroup;
  selectedFile: File | undefined;

  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.initFormRegistro();
  }

  //LLamamos al Servicio para crear un usuario nuevo (monitor)
  registro(): void {
    const formData = new FormData();
    formData.append('file', this.selectedFile!);
    formData.append('nombre', this.registroForm.value.nombre);
    formData.append('apellidos', this.registroForm.value.apellidos);
    formData.append('telefono', this.registroForm.value.telefono);
    formData.append('email', this.registroForm.value.email);
    formData.append('direccion', this.registroForm.value.direccion);
    formData.append('password', this.registroForm.value.password);
    formData.append('fecha_incorp', this.registroForm.value.fecha_incorp);
    formData.append('roles', 'ROLE_MONITOR');

    //Llamamos al servicio para registrar al nuevo usuario monitor
    this.adminService.registro(formData).subscribe({
      next: (resp) => {
        this.successMessage = 'Monitor creado correctamente';
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/admin/monitores']);
          this.showSuccess = false;
        }, 4000);
      },
      error: (err) => {
        this.errorMessage =
          'No se ha podido crear el monitor, intentelo de nuevo más tarde';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
      },
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
