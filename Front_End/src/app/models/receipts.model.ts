export class ReceiptsModel {

  identificaciondeRecibo               : string;
  identificaciondeEmpleado  : string;
  identificaciondePercepcion        : string;
  identificaciondeDeduccion: string;
  Fecha : Date;
  periodo_pago    : string;
  valor_total     : string;

  constructor() {

      this.identificaciondeRecibo          = '';
      this.identificaciondeEmpleado         = '';
      this.identificaciondePercepcion         = '';
      this.identificaciondeDeduccion =  '';
      this.Fecha    = new Date('');
      this.periodo_pago           = '';
      this.valor_total            = '';

  }
}
