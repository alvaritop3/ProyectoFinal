import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-monitor-sidebar',
  templateUrl: './monitor-sidebar.component.html',
  styleUrls: ['./monitor-sidebar.component.scss'],
})
export class MonitorSidebarComponent implements OnInit {
  id_monitor: any;

  constructor(
    private datosUsuario: DatosUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_monitor = this.datosUsuario.id;
  }
  //Borramos los datos del usuario
  logout(): void {
    sessionStorage.clear();
    this.datosUsuario.id = 0;
    this.datosUsuario.nombre = '';
    this.datosUsuario.apellidos = '';
    this.datosUsuario.email = '';
    this.datosUsuario.telefono = '';

    this.router.navigate(['/']);
  }
}
