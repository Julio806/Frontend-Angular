import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoService, ProyectoPublico } from '../../services/proyecto.service';
import { Router } from '@angular/router'; // 👈 NUEVO

@Component({
  selector: 'app-ver-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verproyectos.html',
  styleUrls: ['./verproyectos.css']
})
export class VerProyectosComponent implements OnInit {

  proyectos: ProyectoPublico[] = [];
  subtemaSeleccionado: string = 'Todos';

  // proyecto actualmente abierto en detalle
  proyectoSeleccionado: ProyectoPublico | null = null;

  constructor(
    private proyectoService: ProyectoService,
    private router: Router       // 👈 NUEVO
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.proyectoService.listarProyectosPublicos().subscribe({
      next: (lista) => {
        this.proyectos = lista;
      },
      error: (err) => {
        console.error('Error listando proyectos públicos:', err);
      }
    });
  }

  filtrarPorSubtema(subtema: string): void {
    this.subtemaSeleccionado = subtema;
    // cuando cambias de filtro, cierra el detalle si estaba abierto
    this.proyectoSeleccionado = null;
  }

  savedProjects(): ProyectoPublico[] {
    if (this.subtemaSeleccionado === 'Todos') {
      return this.proyectos;
    }
    return this.proyectos.filter(p => p.actividad === this.subtemaSeleccionado);
  }

  verProyecto(p: ProyectoPublico): void {
    this.proyectoSeleccionado = p;
  }

  cerrarDetalle(): void {
    this.proyectoSeleccionado = null;
  }

  obtenerClaseEstatus(estado: string | null | undefined): string {
    const valor = (estado || '').toLowerCase();
    if (valor.includes('curso')) {
      return 'badge badge-encurso';
    }
    if (valor.includes('final')) {
      return 'badge badge-finalizado';
    }
    if (valor.includes('cancel')) {
      return 'badge badge-cancelado';
    }
    return 'badge badge-default';
  }

  // 🔍 Visualizar documento en nueva pestaña (usa /view/{id})
  previewFile(project: ProyectoPublico): void {
    if (!project.documentoUrl) { return; }

    // proyecto.documentoUrl viene como "/api/media/download/3"
    const match = project.documentoUrl.match(/\/download\/(\d+)/);
    if (!match) { return; }

    const mediaId = match[1];
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const url = `http://${host}:8080/api/media/view/${mediaId}`;

    window.open(url, '_blank');
  }

  // ⬇ Descargar documento (usa /download/{id})
  downloadFile(project: ProyectoPublico): void {
    if (!project.documentoUrl) return;

    // project.documentoUrl === "/api/media/download/3"
    const match = project.documentoUrl.match(/\/download\/(\d+)/);
    if (!match) return;

    const mediaId = match[1];
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const url = `http://${host}:8080/api/media/download/${mediaId}`;

    // Deja que el navegador maneje la descarga
    window.open(url, '_blank');
  }

  // 🏠 Volver al inicio
  volverAlHome(): void {
    // Según tu tabla de rutas, la raíz '' muestra el Home
    this.router.navigate(['/']);  // si tu home fuera '/home', cambia aquí
  }

}
