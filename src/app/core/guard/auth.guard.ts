// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken() && !this.authService.isTokenExpired(this.authService.getToken()!)) {
      return true;
    }

      //this.authService.logout();
      //this.router.navigate(['/auth/login']);
      return false;

  }
}
