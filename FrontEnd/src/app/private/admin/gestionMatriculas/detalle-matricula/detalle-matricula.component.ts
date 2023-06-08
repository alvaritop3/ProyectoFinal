import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatriculaInterface } from 'src/app/interfaces/matricula-interface';
import { AdminService } from 'src/app/services/admin.service';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Component({
  selector: 'app-detalle-matricula',
  templateUrl: './detalle-matricula.component.html',
  styleUrls: ['./detalle-matricula.component.scss'],
})
export class DetalleMatriculaComponent implements OnInit {
  id_matricula!: any;
  id_admin!: number;

  matricula: MatriculaInterface = {
    id: 0,
    fecha: '',
    estado: '',
    alumno_id: 0,
    curso_id: 0,
  };

  estado!: string;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private datosUsuario: DatosUsuarioService
  ) {
    //Recojo el id de la matricula
    this.id_matricula = this.route.snapshot.paramMap.get('idMatricula');
    //Recojo el id del admin
    this.id_admin = this.datosUsuario.id;
  }

  ngOnInit(): void {
    //Llamamos al servicio para obtener la matricula con sus detalles
    this.adminService.mostrarMatricula(this.id_matricula).subscribe({
      next: (matricula) => {
        this.matricula = matricula;
        this.estado = matricula.estado;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //Método para cambiar el estado de un matricula
  cambiarEstado() {
    //Le mandamos el estado, el id del curso y el id del alumno en formato json
    let datos = {
      estado: this.estado,
      alumno_id: this.matricula.alumno_id,
      curso_id: this.matricula.curso_id,
      admin_id: this.id_admin,
    };

    this.adminService
      .cambiarEstadoMatricula(this.id_matricula, datos)
      .subscribe({
        next: (response) => {
          //console.log(response);
          this.router.navigate(['/admin/matriculas']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  //Si cierra el botón, el estado del curso se mantiene tal y como viene de la BBDD
  cerrarEstado() {
    this.estado = this.matricula.estado;
  }
}
