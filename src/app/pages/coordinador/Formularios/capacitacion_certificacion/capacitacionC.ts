import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 1. Interfaz para definir la estructura de datos
export interface ICapacitacion {
  nombre: string;
  tipo: string;
  duracion: string;
  requisitos: string;
  competencias: string;
  publicoObjetivo: string;
  contenido: string;
  materiales: string;
  emisor: string;
  criteriosEvaluacion: string;
  disponibilidad: string;
  costo: string;
  instructores: string;
  autorizacion: string;
}

@Component({
  selector: 'app-capacitaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './capacitacionC.html',
  styleUrls: ['./capacitacionC.css']
})
export class CapacitacionesComponent implements OnInit {

  // 2. Modelo de datos del formulario
  capacitacion: ICapacitacion = {
    nombre: '',
    tipo: '',
    duracion: '',
    requisitos: '',
    competencias: '',
    publicoObjetivo: '',
    contenido: '',
    materiales: '',
    emisor: '',
    criteriosEvaluacion: '',
    disponibilidad: '',
    costo: '',
    instructores: '',
    autorizacion: ''
  };

  // 3. Opciones del combobox
  tiposCapacitacion: string[] = [
    'Módulo de autoaprendizaje (webinar)',
    'Curso virtual',
    'Taller presencial / virtual',
    'Certificación técnica'
  ];

  constructor() {}

  ngOnInit(): void {}

  // Guardar datos
  guardarDatos(): void {
    console.log('Datos de Capacitación a enviar:', this.capacitacion);
    alert('Datos de CAPACITACIÓN listos para enviar.');
  }

}
