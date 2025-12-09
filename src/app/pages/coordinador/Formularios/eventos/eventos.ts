import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface IEvento {
  nombreEvento: string;
  tipo: string;
  fechaHorario: string;
  sede: string;
  organizador: string;
  objetivo: string;
  publicoObjetivo: string;
  programa: string;
  ponentes: string;
  requisitos: string;
  materiales: string;
  evidencias: File | null;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css']
})
export class EventosComponent {

  evento: IEvento = {
    nombreEvento: '',
    tipo: '',
    fechaHorario: '',
    sede: '',
    organizador: '',
    objetivo: '',
    publicoObjetivo: '',
    programa: '',
    ponentes: '',
    requisitos: '',
    materiales: '',
    evidencias: null
  };

  tiposEvento: string[] = [
    'Taller',
    'Congreso',
    'Foro',
    'Expo',
    'Seminario',
    'Curso'
  ];

  seleccionarArchivo(event: any) {
    const archivo = event.target.files[0];
    this.evento.evidencias = archivo;
  }

  guardarEvento(): void {
    console.log('Datos del módulo EVENTOS:', this.evento);
    alert('Datos del módulo EVENTOS listos para enviar.');
  }
}
