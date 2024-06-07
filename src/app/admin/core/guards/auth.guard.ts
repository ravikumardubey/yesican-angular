import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(SsrCookieService);
  const token = cookie.check('ysAccess');
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigate(['/admin/login']);
    return false;
  }
};
