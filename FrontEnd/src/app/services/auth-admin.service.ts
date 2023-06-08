import { Injectable } from '@angular/core';
import { JwtDecodeService } from './jwt-decode.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  constructor(private jwtDecode: JwtDecodeService) {}

  isAuthenticated$(): boolean {
    let token = localStorage.getItem('token');
    let decodeToken = this.jwtDecode.DecodeToken(String(token));

    if (decodeToken.roles.includes('ROLE_ADMIN')) {
      return true;
    } else {
      return false;
    }
  }
}
