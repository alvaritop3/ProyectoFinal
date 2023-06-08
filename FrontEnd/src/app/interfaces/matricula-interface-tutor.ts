import { SesionInterface } from './sesion-interface';

export interface MatriculaInterfaceTutor {
  id: number;
  estado: string;
  fecha: string;
  atendido_por: string;
  curso_id: number;
  curso_nombre: string;
  sesiones: SesionInterface[];
}
