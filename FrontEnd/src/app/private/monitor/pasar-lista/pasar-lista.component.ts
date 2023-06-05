import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pasar-lista',
  templateUrl: './pasar-lista.component.html',
  styleUrls: ['./pasar-lista.component.scss']
})
export class PasarListaComponent implements OnInit{

  id_sesion! : any;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    //Recojo el id de la sesion
    this.id_sesion = this.route.snapshot.paramMap.get('idSesion');
    
  }


}
