// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // 🚫 En SSR no existe window/localStorage, dejamos pasar
    if (typeof window === 'undefined') {
      return true;
    }

    const token = localStorage.getItem('jwt');
    const rol = localStorage.getItem('rol');
    const url = state.url;

    // si no hay token → login
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // solo ADMIN en /panel y sus rutas
    if (url.startsWith('/panel') && rol !== 'ADMIN') {
      this.router.navigate(['/coordinador']);
      return false;
    }

    // solo COORDINADOR en /coordinador y sus rutas
    if (url.startsWith('/coordinador') && rol !== 'COORDINADOR') {
      this.router.navigate(['/panel']);
      return false;
    }

    return true;
  }
}
