import { Component, OnInit } from '@angular/core';
import { MatriculaInterface } from 'src/app/interfaces/matricula-interface';
import { AdminService } from 'src/app/services/admin.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-ver-matriculas',
  templateUrl: './ver-matriculas.component.html',
  styleUrls: ['./ver-matriculas.component.scss'],
})
export class VerMatriculasComponent implements OnInit {
  //Array donde almacenamos las matriculas
  arrayMatriculas: Array<MatriculaInterface> = [];
  arrayMatriculasPendientes: Array<MatriculaInterface> = [];
  arrayMatriculasGestionadas: Array<MatriculaInterface> = [];

  id_admin: number = 0;
  mostrarMatGestionadas: boolean = false;

  constructor(private adminService: AdminService, private datosUsuario: DatosUsuarioService) {}

  ngOnInit(): void {

    this.id_admin = this.datosUsuario.id;

    this.adminService.listaMatriculas().subscribe({
      next: (matriculas) => {
        this.arrayMatriculas = matriculas;

        //Ordenamos de más antiguas a mas nuevas
        this.arrayMatriculas = this.arrayMatriculas.sort((a: any, b: any) => {
          let fechaInicioA: any = new Date(a.fecha);
          let fechaInicioB: any = new Date(b.fecha);

          return fechaInicioA - fechaInicioB;
        });

        //Filtramos por el campo estado
        this.arrayMatriculasPendientes = this.arrayMatriculas.filter(
          (matricula) => {
            return matricula.estado.toLowerCase() == 'pendiente';
          }
        );
      },
      error: (err) => {
        console.log(err);
      },
    });


    this.adminService.listaMatriculasGestionadas(this.id_admin).subscribe({
      next: (matriculas) => {
        this.arrayMatriculasGestionadas = matriculas;
        console.log(matriculas)
        this.mostrarMatGestionadas = true;
      },
      error: (err) => {
        console.log(err);
        this.mostrarMatGestionadas = false;
      },
    });
  }

  mostrarGestionadas() {
    
    this.adminService.listaMatriculasGestionadas(this.id_admin).subscribe({
      next: (matriculas) => {
        this.arrayMatriculasGestionadas = matriculas;
        console.log(matriculas)
        this.mostrarMatGestionadas = true;
      },
      error: (err) => {
        console.log(err);
        this.mostrarMatGestionadas = false;
      },
    });
  }
}
