import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface IParticipante {
  // A. Datos Generales
  nombreInstitucion: string;
  tipoParticipante: string;
  descripcionInstitucional: string;
  rfc: string;
  representante: string;
  cargo: string;
  correo: string;
  telefono: string;
  paginaWeb: string;

  // B. Perfil del Participante
  sector: string;
  actividadesCafe: string;
  region: string;
  estado: string;
  impacto: string;

  // C. Rol en la Plataforma
  aportaciones: string[];
  intereses: string[];

  // D. Documentos
  logo: File | null;
  cartaIntencion: File | null;
}

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './participantes.html',
  styleUrls: ['./participantes.css']
})
export class ParticipantesComponent implements OnInit {

  step: number = 1; // 1: A, 2: B, 3: C, 4: D

  form!: FormGroup;
  
  // Variables para almacenar archivos
  logoFile: File | null = null;
  cartaFile: File | null = null;

  tiposParticipante: string[] = [
    'Tecnológico',
    'Universidad',
    'Dependencia de Gobierno',
    'Productor',
    'Empresa',
    'ONG'
  ];

  sectores: string[] = [
    'Productivo',
    'Académico',
    'Gobierno',
    'Social'
  ];

  impactos: string[] = [
    'Local',
    'Regional',
    'Estatal',
    'Nacional'
  ];

  aportacionesLista: string[] = [
    'Datos técnicos',
    'Prácticas',
    'Capacitación',
    'Infraestructura',
    'Innovación',
    'Financiamiento'
  ];

  interesesLista: string[] = [
    'Investigación',
    'Producción',
    'Vinculación',
    'Certificación',
    'Asistencia técnica',
    'Tecnología'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.form = this.fb.group({
      // A. Datos Generales
      nombreInstitucion: ['', [Validators.required, Validators.minLength(3)]],
      tipoParticipante: ['', Validators.required],
      descripcionInstitucional: ['', [Validators.required, Validators.minLength(10)]],
      rfc: [''],
      representante: ['', Validators.required],
      cargo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      paginaWeb: [''],

      // B. Perfil del Participante
      sector: ['', Validators.required],
      actividadesCafe: ['', [Validators.required, Validators.minLength(10)]],
      region: ['', Validators.required],
      estado: ['', Validators.required],
      impacto: ['', Validators.required],

      // C. Rol en la Plataforma
      aportaciones: ['', Validators.required],
      intereses: ['', Validators.required],

      // D. Documentos
      logo: [''],
      cartaIntencion: ['']
    });
  }

  // Obtener grupos de campos por paso
  obtenerCamposStep1() {
    return ['nombreInstitucion', 'tipoParticipante', 'descripcionInstitucional', 'rfc', 'representante', 'cargo', 'correo', 'telefono', 'paginaWeb'];
  }

  obtenerCamposStep2() {
    return ['sector', 'actividadesCafe', 'region', 'estado', 'impacto'];
  }

  obtenerCamposStep3() {
    return ['aportaciones', 'intereses'];
  }

  // Validar si un paso es válido
  esStepValido(stepNum: number): boolean {
    let campos: string[] = [];
    
    if (stepNum === 1) {
      campos = this.obtenerCamposStep1();
    } else if (stepNum === 2) {
      campos = this.obtenerCamposStep2();
    } else if (stepNum === 3) {
      campos = this.obtenerCamposStep3();
    }

    return campos.every(campo => {
      const control = this.form.get(campo);
      return control && control.valid;
    });
  }

  // Navegar al siguiente paso
  siguiente(): void {
    if (this.esStepValido(this.step) && this.step < 4) {
      this.step++;
      setTimeout(() => {
        const elemento = document.getElementById(`step-${this.step}`);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (!this.esStepValido(this.step)) {
      alert(`Por favor, completa todos los campos requeridos en el paso ${this.step}`);
    }
  }

  // Regresar al paso anterior
  regresar(): void {
    if (this.step > 1) {
      this.step--;
      setTimeout(() => {
        const elemento = document.getElementById(`step-${this.step}`);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  // Manejar cambio de archivos
  onFileChange(event: any, tipo: 'logo' | 'cartaIntencion'): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      if (tipo === 'logo') {
        this.logoFile = target.files[0];
      } else {
        this.cartaFile = target.files[0];
      }
    }
  }

  // Guardar participante
  guardarParticipante(): void {
    if (this.form.valid && this.step === 4) {
      const datosCompletos: any = {
        ...this.form.value,
        logo: this.logoFile?.name || 'Sin archivo',
        cartaIntencion: this.cartaFile?.name || 'Sin archivo'
      };

      console.log('=== DATOS DEL PARTICIPANTE COMPLETOS ===');
      console.log(datosCompletos);
      console.log('=====================================');

      alert('✓ Datos del PARTICIPANTE guardados exitosamente.\nVerifica la consola para ver todos los datos registrados.');
      
      // Aquí podrías enviar los datos a un backend
      // this.apiService.guardarParticipante(datosCompletos).subscribe(...)
    } else {
      alert('Por favor, completa todos los pasos del formulario antes de guardar.');
    }
  }
}
