import { Injectable } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CredencialesInterface } from '../interfaces/credencialesInterface';
import { JwtDecodeService } from './jwt-decode.service';
import { JsonInterface } from '../interfaces/json-interface';
import { DatosUsuario } from '../interfaces/datos-usuario';
import { DatosTutorService } from './datos-tutor.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "https://127.0.0.1:8000";
  user_email = "";

  constructor(private http: HttpClient, private jwtService: JwtDecodeService, private datosTutor:DatosTutorService) { 
  }
 
  //Servicio para comprobar el login
  login (credenciales: CredencialesInterface): Observable<JsonInterface>{

    return this.http.post(`${this.baseUrl}/login_check`, credenciales, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>)=>{
      
      const body = response.body;
      //console.log(body['token']);
      const token = body['token'];

      localStorage.setItem('token', token);

      //Decodificacion del token
      const tokenDecoded : JsonInterface = this.jwtService.DecodeToken(token);

      this.user_email = tokenDecoded.username;
      //console.log("token decodificado: "+ tokenDecoded.roles);

      return tokenDecoded;
      
      }));

      
  }

  getToken(){
    return localStorage.getItem('token');
  }

  //Para obtener la información del usuario y almacenarla en el localStorage
  getDatosByEmail(email: string):any{
    console.log(this.user_email);
    return this.http.get(`${this.baseUrl}/usuario/${email}`);
  }

}
