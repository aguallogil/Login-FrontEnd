import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { AuthService } from '../auth/auth.service';

export const jwtGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    // Si el usuario está logueado, redirigir a la ruta raíz (u otra ruta si es necesario)
    router.navigate(['/']);
    return false;
  }
  return true;
};