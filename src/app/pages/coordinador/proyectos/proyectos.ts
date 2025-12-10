import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoService, Proyecto, MediaFile } from '../../../services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent implements OnInit {

  // ===========================
  //   LISTA DE PROYECTOS
  // ===========================
  proyectos: Proyecto[] = [];

  // --- Filtros de la UI ---
  filtroBusqueda: string = '';
  filtroEstado: string = '';
  filtroEmpresa: string = '';

  estadosProyecto: string[] = [];
  empresasVinculadas: string[] = [];

  // --- Paginación ---
  pageSize: number = 6;   // proyectos por página
  currentPage: number = 1;

  // Proyectos filtrados (búsqueda + combos)
  get proyectosFiltrados(): Proyecto[] {
    const termino = this.filtroBusqueda.trim().toLowerCase();

    return this.proyectos.filter((p) => {
      const nombre = (p.nombre || '').toLowerCase();
      const actividad = (p.actividad || '').toLowerCase();
      const empresa = (p.empresaVinculada || '').toLowerCase();
      const estado = (p.estadoProyecto || '');

      const coincideBusqueda =
        termino === '' ||
        nombre.includes(termino) ||
        actividad.includes(termino) ||
        empresa.includes(termino);

      const coincideEstado =
        this.filtroEstado === '' || estado === this.filtroEstado;

      const coincideEmpresa =
        this.filtroEmpresa === '' || p.empresaVinculada === this.filtroEmpresa;

      return coincideBusqueda && coincideEstado && coincideEmpresa;
    });
  }

  get totalProyectosFiltrados(): number {
    return this.proyectosFiltrados.length;
  }

  get totalPaginas(): number {
    return this.totalProyectosFiltrados === 0
      ? 1
      : Math.ceil(this.totalProyectosFiltrados / this.pageSize);
  }

  get proyectosFiltradosPaginados(): Proyecto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.proyectosFiltrados.slice(start, end);
  }

  get indiceInicio(): number {
    if (this.totalProyectosFiltrados === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get indiceFin(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalProyectosFiltrados);
  }

  onFiltroChange(): void {
    // Siempre que cambia un filtro, regresamos a página 1
    this.currentPage = 1;
  }

  irPaginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  irPaginaSiguiente(): void {
    if (this.currentPage < this.totalPaginas) {
      this.currentPage++;
    }
  }

  // ===========================
  //   MODAL / DOCUMENTOS
  // ===========================
  proyectoSeleccionado: Proyecto | null = null;
  proyectoEnEdicion: Proyecto | null = null;

  documentos: MediaFile[] = [];
  archivoSeleccionado: File | null = null;
  mostrarModalDocs = false;

  docParaActualizar: MediaFile | null = null;
  archivoParaActualizar: File | null = null;

  // Ya no hace falta host
  private readonly mediaBaseUrl = '/cafe/api/media';


  constructor(private proyectoService: ProyectoService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  // ===========================
  //   HELPERS DE FILTROS
  // ===========================
  private actualizarOpcionesFiltros(): void {
    const estadosSet = new Set<string>();
    const empresasSet = new Set<string>();

    for (const p of this.proyectos) {
      if (p.estadoProyecto) {
        estadosSet.add(p.estadoProyecto);
      }
      if (p.empresaVinculada) {
        empresasSet.add(p.empresaVinculada);
      }
    }

    this.estadosProyecto = Array.from(estadosSet).sort();
    this.empresasVinculadas = Array.from(empresasSet).sort();
  }

  // ===========================
  //   CRUD PROYECTOS
  // ===========================
  cargarProyectos(): void {
    this.proyectoService.listarProyectos().subscribe({
      next: (lista) => {
        this.proyectos = lista || [];
        this.actualizarOpcionesFiltros();
        this.currentPage = 1;
      },
      error: (err) => console.error('Error listando proyectos:', err)
    });
  }

  abrirModalDocumentos(p: Proyecto): void {
    this.proyectoSeleccionado = p;
    this.proyectoEnEdicion = { ...p };
    this.mostrarModalDocs = true;
    this.cargarDocumentos();
  }

  editarProyecto(p: Proyecto): void {
    // Por ahora editar = abrir el mismo modal donde se editan campos
    this.abrirModalDocumentos(p);
  }

  cerrarModalDocumentos(): void {
    this.mostrarModalDocs = false;
    this.proyectoSeleccionado = null;
    this.proyectoEnEdicion = null;
    this.documentos = [];
    this.archivoSeleccionado = null;
    this.docParaActualizar = null;
    this.archivoParaActualizar = null;
  }

  // ===========================
  //   DOCUMENTOS / MEDIA
  // ===========================
  esImagen(doc: MediaFile): boolean {
    return !!doc.fileType && doc.fileType.startsWith('image/');
  }

  get imagenes(): MediaFile[] {
    return this.documentos.filter(d => this.esImagen(d));
  }

  get otrosDocumentos(): MediaFile[] {
    return this.documentos.filter(d => !this.esImagen(d));
  }

  getMediaUrl(doc: MediaFile): string {
    return `${this.mediaBaseUrl}/view/${doc.id}`;
  }

  cargarDocumentos(): void {
    if (!this.proyectoSeleccionado?.id) return;

    this.proyectoService.listarDocumentos(this.proyectoSeleccionado.id).subscribe({
      next: (docs) => this.documentos = docs,
      error: (err) => console.error('Error listando documentos:', err)
    });
  }

  onFileChangeNuevo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.archivoSeleccionado = file;
  }

  subirDocumento(): void {
    if (!this.archivoSeleccionado || !this.proyectoSeleccionado?.id) return;

    const uploaderId = 1; // TODO: id del usuario logueado
    this.proyectoService.subirDocumento(
      this.archivoSeleccionado,
      this.proyectoSeleccionado.id,
      uploaderId
    ).subscribe({
      next: () => {
        this.archivoSeleccionado = null;
        const input = document.getElementById('fileInputDocsNuevo') as HTMLInputElement | null;
        if (input) input.value = '';
        this.cargarDocumentos();
        alert('Archivo subido correctamente.');
      },
      error: (err) => console.error('Error subiendo documento:', err)
    });
  }

  guardarCambiosProyecto(): void {
    if (!this.proyectoEnEdicion?.id) return;

    this.proyectoService.actualizarProyecto(this.proyectoEnEdicion.id, this.proyectoEnEdicion).subscribe({
      next: (proyActualizado) => {
        const idx = this.proyectos.findIndex(p => p.id === proyActualizado.id);
        if (idx !== -1) this.proyectos[idx] = proyActualizado;
        this.proyectoSeleccionado = proyActualizado;
        this.proyectoEnEdicion = { ...proyActualizado };
        this.actualizarOpcionesFiltros();
        alert('Proyecto actualizado correctamente.');
      },
      error: (err) => {
        console.error('Error actualizando proyecto:', err);
        alert('Ocurrió un error al actualizar el proyecto.');
      }
    });
  }

  verDocumento(doc: MediaFile): void {
    const url = this.getMediaUrl(doc);
    window.open(url, '_blank');
  }

  descargarDocumento(doc: MediaFile): void {
    this.proyectoService.descargarDocumento(doc.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.fileName || 'archivo';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Error descargando documento:', err)
    });
  }

  eliminarDocumento(doc: MediaFile): void {
    if (!confirm(`¿Eliminar el archivo "${doc.fileName}"?`)) return;

    this.proyectoService.eliminarDocumento(doc.id).subscribe({
      next: () => {
        this.cargarDocumentos();
        alert('Archivo eliminado correctamente.');
      },
      error: (err) => console.error('Error eliminando documento:', err)
    });
  }

  seleccionarDocParaActualizar(doc: MediaFile): void {
    this.docParaActualizar = doc;
    this.archivoParaActualizar = null;
    const input = document.getElementById('fileInputUpdate') as HTMLInputElement | null;
    if (input) input.value = '';
  }

  onFileChangeActualizar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.archivoParaActualizar = file;
  }

  actualizarDocumento(): void {
    if (!this.docParaActualizar || !this.archivoParaActualizar) return;

    this.proyectoService.actualizarDocumento(this.docParaActualizar.id, this.archivoParaActualizar).subscribe({
      next: () => {
        this.docParaActualizar = null;
        this.archivoParaActualizar = null;
        const input = document.getElementById('fileInputUpdate') as HTMLInputElement | null;
        if (input) input.value = '';
        this.cargarDocumentos();
        alert('Archivo actualizado correctamente.');
      },
      error: (err) => {
        console.error('Error actualizando documento:', err);
        alert('Ocurrió un error al actualizar el archivo.');
      }
    });
  }
}
