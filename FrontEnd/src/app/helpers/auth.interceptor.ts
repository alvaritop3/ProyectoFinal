import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Recuperamos el token del sessionStorage y en el caso de que haya, lo incluimos en la cabecera
    const token = this.loginService.getToken();

    if (token) {
      const clonado = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(clonado);
    }

    //En caso de que no exista JWT en sessionStorage, mandará la solicitud tal cual
    return next.handle(request);
  }
}
