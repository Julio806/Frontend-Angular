import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface IRedColaboracion {
  institucionSolicitante: string;
  tipoColaboracion: string;
  descripcionNecesidad: string;
  numeroEstudiantes: string;
  perfilCompetencias: string;
  duracion: string;
  beneficios: string;
  personaContacto: string;
  documentosAdjuntos: string;
  cartaIntencion: string;
}

@Component({
  selector: 'app-redes-colaboraciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './redes-colaboraciones.html',
  styleUrls: ['./redes-colaboraciones.css']
})
export class RedesColaboracionesComponent {

  colaboracion: IRedColaboracion = {
    institucionSolicitante: '',
    tipoColaboracion: '',
    descripcionNecesidad: '',
    numeroEstudiantes: '',
    perfilCompetencias: '',
    duracion: '',
    beneficios: '',
    personaContacto: '',
    documentosAdjuntos: '',
    cartaIntencion: ''
  };

  tiposColaboracion: string[] = [
    'Servicio social',
    'Residencias profesionales',
    'Proyecto NODES',
    'Proyecto dual',
    'Investigación conjunta'
  ];

  onFileChange(event: any, field: 'documentosAdjuntos' | 'cartaIntencion'): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      this.colaboracion[field] = target.files[0].name;
    }
  }

  guardarDatos(): void {
    console.log('Datos del módulo REDES / COLABORACIONES:', this.colaboracion);
    alert('Datos del módulo REDES / COLABORACIONES listos para enviar.');
  }
}
