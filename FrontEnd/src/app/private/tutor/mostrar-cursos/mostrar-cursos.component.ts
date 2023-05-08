import { Component, OnInit } from '@angular/core';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-mostrar-cursos',
  templateUrl: './mostrar-cursos.component.html',
  styleUrls: ['./mostrar-cursos.component.scss']
})
export class MostrarCursosComponent implements OnInit{

  arrayCursos: Array<any> = [];

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {

    this.tutorService.mostrarCursos().subscribe({
      next: (cursos)=>{
        this.arrayCursos = cursos;
      },
      error: (err)=>{
        console.log(err);
        
      }
    })

  }
}
