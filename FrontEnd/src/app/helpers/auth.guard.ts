import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private loginService: LoginService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //Si existe el token en el localStorage, permitimos la navegación a la ruta
    if (this.loginService.getToken()){
      return true;
    }

    //Por defecto, o si no hay token, redirigimos a la página de inicio
    this.router.navigate(['/']);
      return false;
  }
  
}
