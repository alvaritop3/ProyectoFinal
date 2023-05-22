import { Component, OnInit } from '@angular/core';
import { MatriculaInterface } from 'src/app/interfaces/matricula-interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ver-matriculas',
  templateUrl: './ver-matriculas.component.html',
  styleUrls: ['./ver-matriculas.component.scss']
})
export class VerMatriculasComponent implements OnInit{

  //Array donde almacenamos las matriculas
  arrayMatriculas : Array<MatriculaInterface>=[];
  arrayMatriculasPendientes:Array<MatriculaInterface>=[];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {

    this.adminService.listaMatriculas().subscribe({
      next:(matriculas) =>{
        this.arrayMatriculas = matriculas;
        
        //Ordenamos de más antiguas a mas nuevas
        this.arrayMatriculas = this.arrayMatriculas.sort((a: any, b: any) => {
          let fechaInicioA: any = new Date(a.fecha);
          let fechaInicioB: any = new Date(b.fecha);

          return fechaInicioA - fechaInicioB;
        });

        //Filtramos por el campo estado
        this.arrayMatriculasPendientes = this.arrayMatriculas.filter(matricula=>{
          return matricula.estado.toLowerCase() == "pendiente";
        })

      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
