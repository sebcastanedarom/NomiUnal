import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from '../../../models/employee.model';
import { EmployeeServiceService } from '../../../services/employee-service.service';

@Component({
  selector: 'app-employee-perfil',
  templateUrl: './employee-perfil.component.html',
  styleUrls: ['./employee-perfil.component.css']
})
export class EmployeePerfilComponent implements OnInit {

  id: string;
  employee: EmployeeModel;
  data: any;
  constructor(private activateRoute: ActivatedRoute,
              private eService: EmployeeServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.getEmployee(this.id).then( () => {
        this.employee = this.data.empleado[0];

        switch (this.data.empleado[0].id_cargo) {
          case 1:
            this.employee.cargo = 'empleado principal';
            break;
          case 2:
            this.employee.cargo = 'empleado secundario';
            break;
          default:
            break;
        }
        switch (this.data.empleado[0].id_area) {
          case 1:
            this.employee.area = 'bodega';
            break;
          case 2:
            this.employee.area = 'empleado secundario';
            break;
          default:
            break;
        }
      });
    });
  }

  getEmployee(id){
    return new Promise ((res, rej) => {
      this.eService.getEmployee( id )
      .subscribe((resp: any) => {
        res (this.data = resp);
      });
    });
  }

  exit() {
    this.router.navigate(['home/employee-information']);
  }

  navigateAbsences() {
    this.router.navigate(['home/employee-information/employee-perfil/absences', this.id]);
  }

  navigateDiscounts() {
    this.router.navigate(['home/employee-information/employee-perfil/discounts', this.id]);
  }


  navigateEditInformation() {
    this.router.navigate(['home/employee-information/employee-perfil/edit-information', this.id]);
  }

  navigateExtraHours() {
    this.router.navigate(['home/employee-information/employee-perfil/extra-hours', this.id]);
  }

  navigatePaymentReport() {
    this.router.navigate(['home/employee-information/employee-perfil/payment-report', this.id]);
  }

  navigatePayments() {
    this.router.navigate(['home/employee-information/employee-perfil/payments', this.id]);
  }


}
