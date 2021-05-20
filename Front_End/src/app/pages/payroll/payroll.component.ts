import { Component, OnInit } from '@angular/core';
import { ReceiptsModel } from '../../models/receipts.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  id: string;

  recibos = [
    {
      id_recibo: '68417236',
      nombre_empleado: 'Maria Alejandra Dias Perez',
      id_documento: '1015460973',
      area: 'Construccion',
      cargo: 'Administradora',
      fecha: '2020-06-17',
      valor: '$500.000'
    },
    {
      id_recibo: '0',
      nombre_empleado: '0',
      id_documento: '0',
      area: '0',
      cargo: '0',
      fecha: '0',
      valor: '0'
    },
    {
      id_recibo: '0',
      nombre_empleado: '0',
      id_documento: '0',
      area: '0',
      cargo: '0',
      fecha: '0',
      valor: '0'
    }
  ]
  constructor(private activateRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;

    });
  }

  exit() {
    this.router.navigate(['home']);
  }
}
