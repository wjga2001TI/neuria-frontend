// auth-redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Si está autenticado, redirige a la página principal
      this.router.navigate(['/account']);
      return false; // Bloquea el acceso a la ruta
    }
    return true; // Permite el acceso si no está autenticado
  }
}
