import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface IMapaRegional {
  nombreActor: string;
  tipoActor: string;
  regionMunicipioLocalidad: string;
  coordenadas: string;
  presencia: string;
  tamanio: string;
  descripcionOfertaServicios: string;
  municipiosAtiende: string;
  certificaciones: string;
  personaContacto: string;
  // ===================================
  // CAMPOS DE CONTACTO SEPARADOS
  // ===================================
  telefono: string;
  correoElectronico: string;
  
  // CAMPOS SIMPLES RESTANTES
  redesSociales: string; 
  ofertaCapacitacion: string; 
}

@Component({
  selector: 'app-mapa-regional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mapas_regionales.html',
  styleUrls: ['./mapas_regionales.css']
})
export class MapaRegionalComponent implements OnInit {

  mapaRegional: IMapaRegional = {
    nombreActor: '',
    tipoActor: '',
    regionMunicipioLocalidad: '',
    coordenadas: '',
    presencia: '',
    tamanio: '',
    descripcionOfertaServicios: '',
    municipiosAtiende: '',
    certificaciones: '',
    personaContacto: '',
    
    // Inicialización de Campos de Contacto Separados
    telefono: '',
    correoElectronico: '',
    
    // Inicialización de Campos Simples Restantes
    redesSociales: '',
    ofertaCapacitacion: ''
  };

  tiposActor: string[] = [
    'Productor',
    'Cooperativa',
    'Beneficio / Procesadora',
    'Exportadora',
    'Empresa proveedora de insumos o servicios',
    'Tostadora',
    'Organización social',
    'Institución pública',
    'Laboratorio'
  ];

  nivelesPresencia: string[] = [
    'Regional',
    'Estatal',
    'Nacional',
    'Internacional'
  ];

  tamanios: string[] = [
    'Pequeño',
    'Mediano',
    'Grande'
  ];

  constructor() {}

  ngOnInit(): void {}

  guardarDatos(): void {
    console.log('Datos del Mapa Regional:', this.mapaRegional);
    alert('Datos de MAPA REGIONAL listos para enviar.');
  }
}