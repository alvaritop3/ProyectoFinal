import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from 'src/app/interfaces/usuario-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ver-monitores',
  templateUrl: './ver-monitores.component.html',
  styleUrls: ['./ver-monitores.component.scss'],
})
export class VerMonitoresComponent implements OnInit {
  //Array donde se almacenan los monitores
  arrayMonitores: Array<UsuarioInterface> = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
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

  editarMonitor(id: number) {}
}
