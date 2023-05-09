import { Component, OnInit } from '@angular/core';
import { DatosTutorService } from 'src/app/services/datos-tutor.service';
import { TutorService } from 'src/app/services/tutor.service';

@Component({
  selector: 'app-mostrar-alumnos',
  templateUrl: './mostrar-alumnos.component.html',
  styleUrls: ['./mostrar-alumnos.component.scss'],
})
export class MostrarAlumnosComponent implements OnInit {
  arrayAlumnos: Array<any> = [];
  id_tutor!: any;
  constructor(private tutorService: TutorService, private datosTutor: DatosTutorService) {}
  

  ngOnInit(): void {
    
      //Cambiar id por el del tutor que se ha registrado
      this.tutorService.listaDeAlumnos(1).subscribe({
        next: (resp) => {
          this.arrayAlumnos = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  
}
