import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editar-mis-datos',
  templateUrl: './editar-mis-datos.component.html',
  styleUrls: ['./editar-mis-datos.component.scss']
})
export class EditarMisDatosComponent implements OnInit{

  //Donde almacenaremos el id del admin que viene por la ruta
  id_admin!: any;
  //Inicializamos un admin con los campos vacios
  admin: UsuarioInterface = {
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
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //Recojo el id del admin
    this.id_admin = this.route.snapshot.paramMap.get('idAdmin');

  }

  ngOnInit(): void {
   //Llamamos al servicio para obtener el monitor por el id
   this.adminService.mostrarMonitor(this.id_admin).subscribe({
    next: (admin) => {
      this.admin = admin;

    },
    error: (err) => {
      console.log(err);
    },
  });
  }

  editar() {

    //Controlar que los campos están introducidos correctamente
    
    this.adminService.editarMonitor(this.id_admin, this.admin).subscribe({
      next: (resp)=>{
        //Avisar de que los datos se han efectuado correctamente
        console.log(this.id_admin);
        this.router.navigate([`/admin/misDatos/${this.id_admin}`]);

      },
      error: (err)=>{
        console.log(err)
      }
    });
    
    
  }

}
