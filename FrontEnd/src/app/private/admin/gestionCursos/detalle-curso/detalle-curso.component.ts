import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoInterface } from 'src/app/interfaces/curso-interface';
import { SesionInterface } from 'src/app/interfaces/sesion-interface';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})
export class DetalleCursoComponent implements OnInit{

  id_curso!:any;

  curso: CursoInterface={
    id: 0,
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
    precio: 0,
    estado: ""
  };

  sesiones: SesionInterface[]=[];

  estado!: string;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    // private router: Router
  ) {
    //Recojo el id del curso
    this.id_curso = this.route.snapshot.paramMap.get('idCurso');
  }

  ngOnInit():void{
    //Llamamos al servicio para obtener el curso
    this.adminService.mostrarCurso(this.id_curso).subscribe({
      next: (curso)=> {
        this.curso = curso;
        this.estado = curso.estado;
        // console.log(this.curso);
      },
      error: (err)=>{
        console.log(err);
      }
    });

    //Llamamos a servicio para obtener las sesiones de ese curso
    this.adminService.listaSesiones(this.id_curso).subscribe({
      next: (sesiones)=>{
        this.sesiones=sesiones;
        // console.log(sesiones);
        // console.log(sesiones[0].monitor);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  
  //Método para cambiar el estado de un curso
  cambiarEstado(){
    //Le mandamos el estado en formato json
    let datos = {estado: this.estado};
    this.adminService.cambiarEstadoCurso(this.id_curso, datos).subscribe({
      next: (response)=>{
        console.log(response);
        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  //Si cierra el botón, el estado del curso se mantiene tal y como viene de la BBDD
  cerrarEstado(){
    this.estado = this.curso.estado;
  }
}
