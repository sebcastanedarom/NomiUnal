import { Component, OnInit } from '@angular/core';
import { ReceiptsModel } from '../../../models/receipts.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  id: string;
  data: any;
  recibos = [
    {
      id_recibo: '',
      nombre_empleado: '',
      id_documento: '',
      area: '',
      cargo: '',
      diasTrabajados: '',
      salario: '',
      deducciones: '',
      percepciones: '',
      salariof: '',
      ARL: '',
      EPS: '',
      AFP: '',
      Banco: '',
      numero_cuenta: ''
    }
  ]
  constructor(private activateRoute: ActivatedRoute,
              private eService: EmployeeServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
    });
    this.verPago().then(() => {
      console.log(this.data);
      this.recibos[0].id_recibo = this.data.info.recibo.id_recibo;
      this.recibos[0].nombre_empleado = `${this.data.empleado[0].nombre} ${this.data.empleado[0].apellido}`;
      this.recibos[0].id_documento = this.data.empleado[0].identificacion;
      this.recibos[0].area = this.data.area;
      this.recibos[0].cargo = this.data.cargo;
      this.recibos[0].diasTrabajados = this.data.info.diasTrabajado;
      this.recibos[0].salario = this.data.info.salario;
      this.recibos[0].deducciones = this.data.info.deduccionesTotal;
      this.recibos[0].percepciones = this.data.info.PercepTotal;
      this.recibos[0].salariof = this.data.info.salarioF;
      this.recibos[0].ARL = this.data.info.arl;
      this.recibos[0].EPS = this.data.info.eps;
      this.recibos[0].AFP = this.data.info.afp;
      this.recibos[0].Banco = this.data.info.banco[0].nombre_banco;
      this.recibos[0].numero_cuenta = this.data.info.ncuenta;
      console.log(this.recibos[0]);
let fecha = new Date(this.data.info.recibo.fecha);
fecha.setMonth(fecha.getMonth() + 1);
console.log(fecha);
//this.crearRecibo(this.id,fecha)

    });
  }

  verPago() {
    return new Promise ((res, rej) => {
      this.eService.postVerPago(this.id, this.id)
      .subscribe(( resp: any) => {
        res(this.data = resp);
      });
    });
  }

  asignarDeducion(idRecibo, idDeduccion){
    return new Promise ((res, rej) => {
      this.eService.postAsiganrDeducciones(idRecibo, idDeduccion)
      .subscribe((resp: any) => {
        res(console.log(resp));
      });
    });
  }

  asignarIncapacidad(idRecibo, idIncapacidad) {
    return new Promise ((res, rej) => {
      this.eService.postAsiganrIncapacidades(idRecibo, idIncapacidad)
      .subscribe((resp: any) => {
        res(console.log(resp));
      });
    });
  }


  llenarRecibo(identificacion, fecha, tiempo_trabajado, salario, cantidad_horas_extra, valorT_hoas_extra,
    valorT_deducciones, valorT_percepciones, valorT_incapacidad, valor_arl, valor_eps,
    valor_afp, valor_total, recibo , id){
      return new Promise ((res, rej) => {
        this.eService.putPagar(identificacion, fecha, tiempo_trabajado, salario, cantidad_horas_extra, valorT_hoas_extra,
          valorT_deducciones, valorT_percepciones, valorT_incapacidad, valor_arl, valor_eps,
          valor_afp, valor_total, recibo, id)
        .subscribe((resp: any) => {
          res(console.log(resp));
        });
      });
  }

  crearRecibo(id, fecha){
    return new Promise ((res, rej) => {
      this.eService.crearPrimerRecibo(id, fecha)
      .subscribe((resp: any) => {
        res(console.log(resp));
      })
    })
  }

  pagar() {
    for (const id of this.data.info.idDeducciones) {
      this.asignarDeducion(this.data.info.recibo.id_recibo, id).then(() => {
      });
    }

    for (const id of this.data.info.idIncapacidades) {
      this.asignarIncapacidad(this.data.info.recibo.id_recibo, id).then(() => {
      });
    }

    this.llenarRecibo(this.id, this.data.info.recibo.fecha, this.data.info.diasTrabajado,
      this.data.info.salario, this.data.info.horasExtras,
    this.data.info.valorHoras, this.data.info.deduccionesTotal, this.data.info.PercepTotal,
    this.data.info.valorIncapacidad, this.data.info.arl, this.data.info.eps, this.data.info.afp
    , this.data.info.salarioF, 'recibo', this.id);

    const fecha = new Date(this.data.info.recibo.fecha);
    fecha.setMonth(fecha.getMonth() + 1);

    this.crearRecibo(this.data.empleado[0].id_empleado, fecha).then(() => {

    });
  }


  exit() {
    this.router.navigate(['home/employee-information/employee-perfil', this.id]);
  }
}
