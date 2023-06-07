export interface UsuarioInterface {
  id: number;
  nombre: string;
  apellidos: string;
  direccion: string;
  email: string;
  telefono: string;
  roles?: Array<string>;
  fecha_incorp?: string;
  foto?: string;
}
