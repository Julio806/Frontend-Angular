import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ITransferenciaTecnologica {
  nombreTecnologia: string;
  tipo: string;
  descripcion: string;
  capacidades: string;
  servicios: string;
  requisitos: string;
  disponibilidad: string;
  costos: string;
  responsable: string;
  documentos: File | null;
  carta: File | null;
}

@Component({
  selector: 'app-transferencias-tecnologicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transferencias-tecnologicas.html',
  styleUrls: ['./transferencias-tecnologicas.css']
})
export class TransferenciasTecnologicasComponent {

  datos: ITransferenciaTecnologica = {
    nombreTecnologia: '',
    tipo: '',
    descripcion: '',
    capacidades: '',
    servicios: '',
    requisitos: '',
    disponibilidad: '',
    costos: '',
    responsable: '',
    documentos: null,
    carta: null
  };

  seleccionarArchivo(event: Event, tipo: 'documentos' | 'carta'): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];

      if (tipo === 'documentos') {
        this.datos.documentos = archivo;
      } else {
        this.datos.carta = archivo;
      }
    }
  }

  guardarTransferencias(): void {
    console.log("Datos Transferencias Tecnológicas:", this.datos);
    alert("Datos del módulo TRANSFERENCIAS TECNOLÓGICAS listos para enviar.");
  }
}
