import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editar-mis-datos',
  templateUrl: './editar-mis-datos.component.html',
  styleUrls: ['./editar-mis-datos.component.scss'],
})
export class EditarMisDatosComponent implements OnInit {
  //Donde almacenaremos el id del admin que viene por la ruta
  id_admin!: any;
  //Inicializamos un admin con los campos vacios
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
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //Recojo el id del admin
    this.id_admin = this.route.snapshot.paramMap.get('idAdmin');
  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener el admin por el id
    this.adminService.mostrarMonitor(this.id_admin).subscribe({
      next: (admin) => {
        this.admin = admin;
        console.log(admin);
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

  editar() {
    //Controlar que los campos están introducidos correctamente

    this.adminService.editarMonitor(this.id_admin, this.admin).subscribe({
      next: (resp) => {
        this.successMessage = 'Datos editados correctamente';
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate([`/admin/misDatos/${this.id_admin}`]);
          this.showSuccess = false;
        }, 4000);
      },
      error: (err) => {
        this.errorMessage = 'Ha ocurrido un error editando los datos';
        this.showError = true;
        setTimeout(() => {
          this.router.navigate(['/tutor']);
          this.showError = false;
        }, 4000);
      },
    });
  }
}
