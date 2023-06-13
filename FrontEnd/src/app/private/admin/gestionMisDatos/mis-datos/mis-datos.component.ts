import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { AdminService } from 'src/app/services/admin.service';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit {
  id_admin!: any;
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;
  //Formulario
  registroForm!: FormGroup;

  admin: UsuarioInterface = {
    id: 0,
    nombre: '',
    apellidos: '',
    direccion: '',
    email: '',
    telefono: '',
    roles: [],
    fecha_incorp: '',
  };

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //Recojo el id del monitor
    this.id_admin = this.route.snapshot.paramMap.get('idAdmin');
    //Inicializamos el formulario
    this.registroForm = this.initFormRegistro();
  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener el monitor por el id
    this.adminService.mostrarMisDatos(this.id_admin).subscribe({
      next: (admin) => {
        this.admin = admin;
      },
      error: (err) => {
        this.errorMessage = 'Ha ocurrido un error obteniendo los datos';
        this.showError = true;
        setTimeout(() => {
          this.router.navigate(['/admin']);
          this.showError = false;
        }, 4000);
      },
    });
  }

  //LLamamos al Servicio para crear un usuario nuevo (admin)
  registro(): void {
    //Creamos el monitor que se enviará en la petición
    const admin = this.registroForm.value;

    //Asignamos el rol
    this.registroForm.value.roles = 'ROLE_ADMIN';
    //Llamamos al servicio para registrar al nuevo usuario monitor
    this.registroService.registro(admin).subscribe({
      next: (resp) => {
        this.successMessage = 'Admin creado correctamente';
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/admin/']);
          this.showSuccess = false;
        }, 4000);
      },
      error: (err) => {
        this.errorMessage =
          'Ha ocurrido un error creando el nuevo administrador';
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 4000);
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
