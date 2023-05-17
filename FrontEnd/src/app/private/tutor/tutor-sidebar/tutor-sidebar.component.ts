import { Component, OnInit } from '@angular/core';
import { DatosAlumnoService } from 'src/app/services/datos-alumno.service';

@Component({
  selector: 'app-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrls: ['./tutor-sidebar.component.scss']
})
export class TutorSidebarComponent implements OnInit{
  
  id_alumno:any;
  
  constructor(private datosAlumno: DatosAlumnoService){}

  ngOnInit(): void {
    // this.id_alumno = this.datosAlumno.id;

    // if(localStorage.getItem("id_alumno")){
    //   console.log(this.id_alumno)
    //   this.id_alumno = localStorage.getItem("id_alumno");
    // }

  }
}
