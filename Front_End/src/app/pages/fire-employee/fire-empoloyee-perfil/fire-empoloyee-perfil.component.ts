import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fire-empoloyee-perfil',
  templateUrl: './fire-empoloyee-perfil.component.html',
  styleUrls: ['./fire-empoloyee-perfil.component.css']
})
export class FireEmpoloyeePerfilComponent implements OnInit {

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
  save(){
    Swal.fire(
      'Empelado Despedido',
      '',
      'success'
    );
  }
  exit() {
    this.router.navigate(['home/fire-employee']);
  }

}
