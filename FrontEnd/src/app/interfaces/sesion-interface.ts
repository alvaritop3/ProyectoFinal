import { UsuarioInterface } from "./usuario-interface";

export interface SesionInterface {
    id: number,
    fecha: string,
    hora_inicio: string,
    //Devolvemos el nombre y apellidos del monitor que imparte la sesión
    monitor: string 
}
