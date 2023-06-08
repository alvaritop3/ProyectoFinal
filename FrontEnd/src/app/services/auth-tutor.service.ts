import { Injectable } from '@angular/core';
import { JwtDecodeService } from './jwt-decode.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTutorService {
  constructor(private jwtDecode: JwtDecodeService) {}

  isAuthenticated$(): boolean {
    let token = sessionStorage.getItem('token');
    let decodeToken = this.jwtDecode.DecodeToken(String(token));

    if (decodeToken.roles.includes('ROLE_TUTOR')) {
      return true;
    } else {
      return false;
    }
  }
}
