import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {

  const router =
    inject(Router);

  const user =
    JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  const allowedRoles =
    route.data['roles'];

  if (
    user &&
    allowedRoles.includes(user.role)
  ) {

    return true;

  }

  router.navigate(['/403']);

  return false;

};