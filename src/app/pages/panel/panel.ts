import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardService, AdminDashboardSummary } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './panel.html',
  styleUrls: ['./panel.css']
})
export class PanelComponent {

  usuario: string = '';
  resumen?: AdminDashboardSummary;

  constructor(
    private router: Router,
    private dashboardService: AdminDashboardService
  ) {}

  ngOnInit() {
    // ⚠️ IMPORTANTE: este if evita que corra en el servidor (SSR),
    // donde NO existe window ni localStorage.
    if (typeof window === 'undefined') {
      return;
    }

    // Ahora sí, solo en el navegador podemos usar localStorage
    const token = window.localStorage.getItem('jwt');
    if (!token) {
      this.router.navigate(['/login']); // 🚪 redirige si no hay sesión
      return;
    }

    // Valor temporal (puedes cambiarlo por lo que viene del backend)
    this.usuario = 'Administrador TEC Frontera Comalapa';

    // Cargar resumen desde el backend
    this.dashboardService.getResumen().subscribe({
      next: (data) => {
        this.resumen = data;
        // Si quieres usar el nombre real del admin:
        // this.usuario = data.adminNombre;
      },
      error: (err) => {
        console.error('Error obteniendo resumen del dashboard:', err);
      }
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('jwt');
    }
    this.router.navigate(['/login']);
  }
}
