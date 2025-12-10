import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ActividadRecienteItem {
  tipo: string;
  mensaje: string;
  etiqueta: string;
  badgeColor: string;
  fecha: string; // viene como ISO string desde el backend
}

export interface AdminDashboardSummary {
  adminNombre: string;
  tecnologicoNombre: string;
  totalTecnologicos: number;
  totalProyectos: number;
  proyectosActivos: number;
  totalEventos: number;
  actividadReciente: ActividadRecienteItem[];
}

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {

 private baseUrl = '/cafe/api/admin';

  constructor(private http: HttpClient) {}

  getResumen(): Observable<AdminDashboardSummary> {
    return this.http.get<AdminDashboardSummary>(`${this.baseUrl}/dashboard-resumen`);
  }
}
