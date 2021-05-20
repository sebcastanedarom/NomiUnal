import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-extra-hours',
  templateUrl: './extra-hours.component.html',
  styleUrls: ['./extra-hours.component.css']
})
export class ExtraHoursComponent implements OnInit {

  id: string;
  employee: EmployeeModel;
  form: FormGroup;

  constructor(private activateRoute: ActivatedRoute,
              private eService: EmployeeServiceService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
      //this.employee = this.eService.getEmployee(this.id);
    });
    this.creatForm();
    this.loadData();
  }

  creatForm() {
    this.form = this.fb.group({
      dia      : ['', [Validators.required], []],
      cantidad : ['', [Validators.required], []],
    });

  }

  loadData() {
    this.form.setValue({
      dia      : '',
      cantidad : '',
    });
  }

  save() {

    if (this.form.invalid) {
      Swal.fire(
        'Error',
        '',
        'error'
        );
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      Swal.fire(
        'Novedad Guardada',
        '',
        'success'
      );
      this.createExtraHour().then(() => {
        this.form.reset();
        this.loadData();
      });


    }
  }

  createExtraHour() {

    return new Promise((res, rej) => {
      this.eService.postHorasExtra(this.id, this.DataDia.dia, this.DataDia.cantidad, this.id).
      subscribe((resp: any) => {
       res(console.log(resp));
      });
    });
  }

  exit() {
    this.router.navigate(['home/employee-information/employee-perfil', this.id]);
  }

  get DiaNoValido() {
    return this.form.get('dia').invalid && this.form.get('dia').touched;
  }

  get CantidadNoValido() {
    return this.form.get('cantidad').invalid && this.form.get('cantidad').touched;
  }

  get DataDia() {
    const data = {
      dia      : Date,
      cantidad : Number,
    };
    data.dia      = this.form.get('dia').value.toISOString().substr(0, 10);
    data.cantidad = this.form.get('cantidad').value;
    return data;
  }

}
