import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

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
      razon    : ['', [Validators.required], []],
      cantidad : ['', [Validators.required], []],
      fecha    : ['', , []],
    });

  }

  loadData() {
    this.form.setValue({
      razon    : '',
      cantidad : '',
      fecha    : '',
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
      console.log(this.Data);

      this.newDiscount().then( () => {
        this.form.reset();
        this.loadData();
      });

    }
  }
  newDiscount() {
    return new Promise ((res, rej) => {
      this.eService.postDeducciones(this.id, this.Data.fecha, this.Data.razon, this.Data.cantidad, this.id)
      .subscribe((resp: any) => {
        res(console.log(resp));
      });
    })
  }

  exit() {
    this.router.navigate(['home/employee-information/employee-perfil', this.id]);
  }

  get RazonNoValido() {
    return this.form.get('razon').invalid && this.form.get('razon').touched;
  }

  get CantidadNoValido() {
    return this.form.get('cantidad').invalid && this.form.get('cantidad').touched;
  }

  get Data() {
    const data = {
      razon    : String,
      cantidad : Number,
      fecha    : Date
    };
    data.razon    = this.form.get('razon').value;
    data.cantidad = this.form.get('cantidad').value;
    data.fecha    = this.form.get('fecha').value.toISOString().substr(0, 10);
    return data;
  }

}
