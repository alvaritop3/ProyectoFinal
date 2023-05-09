import { Component, OnInit } from '@angular/core';
import { TutorService } from 'src/app/services/tutor.service';
import { ActivatedRoute } from '@angular/router';
import { DatosAlumnoService } from 'src/app/services/datos-alumno.service';


@Component({
  selector: 'app-mostrar-cursos',
  templateUrl: './mostrar-cursos.component.html',
  styleUrls: ['./mostrar-cursos.component.scss']
})
export class MostrarCursosComponent implements OnInit{

  arrayCursos: Array<any> = [];
  id_alumno! : any;

  constructor(private tutorService: TutorService, private route: ActivatedRoute, private datosAlumno: DatosAlumnoService) {
    //Recojo el id del  alumno
    this.id_alumno = this.route.snapshot.paramMap.get('idAlumno');
    this.datosAlumno.id = this.id_alumno;
  }

  ngOnInit(): void {

    this.tutorService.mostrarCursos().subscribe({
      next: (cursos)=>{
        this.arrayCursos = cursos;
        //this.arrayCursos = cursos.filter((curso:any)=>{return curso.estado!="finalizado"});

      },
      error: (err)=>{
        console.log(err);
        
      }
    })

  }

  solicitarMatricula(id: number){

    
  }
}
