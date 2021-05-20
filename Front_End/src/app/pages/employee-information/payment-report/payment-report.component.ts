import { Component, OnInit } from '@angular/core';
import { ReceiptsModel } from '../../../models/receipts.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit {

  id: string;
  nombre;
  idEmpleado;
  area;
  cargo;
  recibos = [];
  data;
  constructor(private activateRoute: ActivatedRoute,
              private eService: EmployeeServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;

    });
    this.getData().then(() => {
      console.log(this.data);
      this.recibos = (this.data.recibo);
      this.nombre = this.data.empleado[0].nombre + this.data.empleado[0].apellido;
      this.idEmpleado = this.data.empleado[0].id_empleado;
      this.cargo = this.data.cargo;
      this.area = this.data.area;
    });
  }

  getData(){
    return new Promise ((res,rej)=>{
      this.eService.postVerPagosEmpleado(this.id)
      .subscribe((resp: any) =>{

          res(this.data = resp);
      });
    })
  }

  exit() {
    this.router.navigate(['home/employee-information/employee-perfil', this.id]);
  }
}
