
export class EmployeeModel {

  nombre               : string;
  tipo_identificacion  : string;
  celular        : string;
  fechaNacimiento: Date;
  banco          : string;
  arl            : string;
  eps            : string;
  afp            : string;
  apellido       : string;
  identificacion : string;
  direccion      : string;
  foto         : string;
  numeroCuenta   : string;
  certificadoArl : string;
  certificadoEps : string;
  certificadoAfp : string;
  area           : string;
  cargo          : string;
  horario        : string;
  tipoContrato   : string;
  contrato       : string;
  rol            : string;
  fechaIngreso   : Date;
  tipoCuenta     : string;

  constructor() {

      this.nombre          = '';
      this.tipo_identificacion   = '';
      this.celular         = '';
      this.fechaNacimiento = new Date('');
      this.fechaIngreso    = new Date('');
      this.banco           = '';
      this.arl             = '';
      this.eps             = '';
      this.afp             = '';
      this.apellido        = '';
      this.identificacion  = '';
      this.direccion       = '';
      this.foto            = '';
      this.numeroCuenta    = '';
      this.certificadoArl  = '';
      this.certificadoEps  = '';
      this.certificadoAfp  = '';
      this.area            = '';
      this.cargo           = '';
      this.horario         = '';
      this.tipoContrato    = '';
      this.contrato        = '';
      this.rol             = '';
      this.tipoCuenta      = '';
  }
}
