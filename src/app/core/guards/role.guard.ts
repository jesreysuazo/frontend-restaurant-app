import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  const userToken = jwtService.getToken();

  if (!userToken) {
    router.navigate(['/unauthorized']);
    return false;
  }

  try {
    const tokenPayload = JSON.parse(atob(userToken.split('.')[1]));
    const userRole = tokenPayload.roles[0];
    const requiredRoles: string[] = route.data?.['roles'] || [];
    console.log(requiredRoles, userRole)
    if (requiredRoles[0] == userRole) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    router.navigate(['/unauthorized']);
    return false;
  }
};
