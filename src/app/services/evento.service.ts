// src/app/services/evento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
  id_evento?: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;  // yyyy-MM-dd
  fecha_fin: string;     // yyyy-MM-dd
  lugar: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  // 🔹 Endpoint privado del coordinador (protegido por JWT)
   private apiCoordinador = '/cafe/api/eventos';

  constructor(private http: HttpClient) {}

  listarEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiCoordinador);
  }

  obtenerEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiCoordinador}/${id}`);
  }

  crearEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiCoordinador, evento);
  }

  actualizarEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiCoordinador}/${id}`, evento);
  }

  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiCoordinador}/${id}`);
  }
}
