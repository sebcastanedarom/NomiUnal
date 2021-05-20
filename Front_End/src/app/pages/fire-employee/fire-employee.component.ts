import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fire-employee',
  templateUrl: './fire-employee.component.html',
  styleUrls: ['./fire-employee.component.css']
})
export class FireEmployeeComponent implements OnInit {

  employees: EmployeeModel [] = [];
  id: string;
  data: any;

  constructor(private eService: EmployeeServiceService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.id = '';
    this.getEmployees().then( () => {

      for (let i = 0; i < this.data.empleado.length; i++) {
      this.employees.push(this.data.empleado[i]);
      }
      for (let i = 0; i < this.data.cargos.length; i++) {
        this.employees[i].cargo = this.data.cargos[i][0].nombre_cargo;
      }
      for (let i = 0; i < this.data.areas.length; i++) {
        this.employees[i].area = this.data.areas[i][0].nombre_area;
      }
    });
  }

  getEmployees(){
    return new Promise ((res, rej) => {
      this.eService.getEmployees( )
      .subscribe((resp: any) => {
        res (this.data = resp);
      });
    });
  }

searchEmployee(searchId: string) {
   this.id = searchId;
   if (this.id === '' || this.id === undefined) {
     this.employees = [];
     this.ngOnInit();
     } else {
      const employeesArr: EmployeeModel[] = [];
      for (let i = 0; i < this.employees.length; i++) {
        const employee = this.employees[i];
        const id = employee.identificacion.toString();
        if (id.indexOf(searchId) >= 0) {
          employeesArr.push(employee);
        }
      }
      this.employees = employeesArr;
     }
}

  navigatePerfil(ide) {
    this.router.navigate(['home/fire-employee/fire-employee-perfil', ide]);
  }
  exit() {
    this.router.navigate(['home']);
  }
}
