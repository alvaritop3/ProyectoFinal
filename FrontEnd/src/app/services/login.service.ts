import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "";


  constructor(private http: HttpClient) { 
    this.baseUrl =environment.baseUrl;
  }
	
  //Servicio para crear un usuario nuevo (tutor)
  registro(usuario: any): Observable<any>{
    
    return this.http.post(`https://127.0.0.1:8000/registro`, usuario, {responseType:'text'});
  }

  //Servicio para comprobar el login
  login (credenciales: any): Observable<any>{

    return this.http.post('https://127.0.0.1:8000/login_check', credenciales);
  }

}
