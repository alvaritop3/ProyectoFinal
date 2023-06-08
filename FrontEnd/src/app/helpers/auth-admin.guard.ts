import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from '../services/auth-admin.service';

export const AuthAdminGuard = () => {
  const authService = inject(AuthAdminService);
  const router = inject(Router);

  if (authService.isAuthenticated$()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
