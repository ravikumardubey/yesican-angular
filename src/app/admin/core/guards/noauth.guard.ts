import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const noauthGuard: CanActivateFn = (route, state) => {
  const cookie = inject(SsrCookieService);
  const token = cookie.check('ysAccess');
  const router = inject(Router);
  if (token) {
    router.navigate(['/admin/articles']);
    return false;
  } else {
    return true;
  }
};
