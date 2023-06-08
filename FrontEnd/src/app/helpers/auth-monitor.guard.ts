import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthMonitorService } from '../services/auth-monitor.service';

export const AuthMonitorGuard = () => {
  const authService = inject(AuthMonitorService);
  const router = inject(Router);

  if (authService.isAuthenticated$()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
