import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface IAsistenciaTecnica {
  // Ficha institución
  nombreInstitucion: string;
  tipoAsistencia: string;
  especialistas: string;
  regionOperacion: string;
  requisitosServicio: string;
  capacidadAtencion: string;
  costos: string;
  documentosInstitucionales: File | null;

  // Ficha solicitud
  nombreSolicitante: string;
  tipoSolicitante: string;
  problemaEspecifico: string;
  ubicacion: string;
}

@Component({
  selector: 'app-asistencia-tecnica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia-tecnica.html',
  styleUrls: ['./asistencia-tecnica.css']
})
export class AsistenciaTecnicaComponent {

  asistencia: IAsistenciaTecnica = {
    nombreInstitucion: '',
    tipoAsistencia: '',
    especialistas: '',
    regionOperacion: '',
    requisitosServicio: '',
    capacidadAtencion: '',
    costos: '',
    documentosInstitucionales: null,

    nombreSolicitante: '',
    tipoSolicitante: '',
    problemaEspecifico: '',
    ubicacion: ''
  };

  tiposSolicitante: string[] = [
    'Productor',
    'Empresa',
    'Cooperativa',
    'Municipio'
  ];

  seleccionarArchivo(event: any) {
    this.asistencia.documentosInstitucionales = event.target.files[0];
  }

  guardar(): void {
    console.log('Datos de Asistencia Técnica:', this.asistencia);
    alert('Datos del MÓDULO ASISTENCIA TÉCNICA listos para enviar.');
  }
}
