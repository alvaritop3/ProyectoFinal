import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthTutorService } from '../services/auth-tutor.service';

export const AuthTutorGuard = () => {
  const authService = inject(AuthTutorService);
  const router = inject(Router);

  if (authService.isAuthenticated$()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
