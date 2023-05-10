import { Injectable, NgModule } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
@NgModule()
export class JwtDecodeService {
  constructor() {}

  //Este servicio va a recibir un token y va a devolver el token en forma de JSON
  DecodeToken(token: string): any {
    return jwt_decode(token);
  }
}
