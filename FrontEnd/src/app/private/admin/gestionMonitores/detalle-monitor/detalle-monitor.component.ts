import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-detalle-monitor',
  templateUrl: './detalle-monitor.component.html',
  styleUrls: ['./detalle-monitor.component.scss']
})
export class DetalleMonitorComponent implements OnInit{

   //Donde almacenaremos el id del monitor que viene por la ruta
  id_monitor!: any;
  //Donde almacenamos los datos del monitor
    monitor: UsuarioInterface = {
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
    // private router: Router
  ) {
    //Recojo el id del monitor
    this.id_monitor = this.route.snapshot.paramMap.get('idMonitor');

  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener el monitor por el id
   this.adminService.mostrarMonitor(this.id_monitor).subscribe({
    next: (monitor) => {
      this.monitor = monitor;

    },
    error: (err) => {
      console.log(err);
    },
  });

  
  }
}
