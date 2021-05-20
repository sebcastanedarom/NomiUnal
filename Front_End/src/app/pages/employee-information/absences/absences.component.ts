import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {
  id: any;
  active = false;
  licencia = false;
  vacacines = false;
  justificada = false;
  calamidad = false;
  paternidad = false;
  maternidad = false;
  injustificada = false;
  form: any;

  constructor(private activateRoute: ActivatedRoute,
              private eService: EmployeeServiceService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
    });
    this.creatForm();
  }

  creatForm() {
    this.form = this.fb.group({
      inicio     : ['', [], []],
      fin        : ['', [], []],
      descripcion:  ['', [], []],
    });
  }
  save() {
    Swal.fire(
      'Novedad Guardada',
      '',
      'success'
    );
    this.createAbsences().then(() => {

    });

  }
  createAbsences() {
    let tipo = '';
    switch (true) {
      case this.licencia:
        tipo = 'licencia no remunerada';
        break;
      case this.vacacines:
          tipo = 'vacaciones';
          break;
      case this.justificada:
        tipo = 'Incapacidad Justificada';
        break;
      case this.calamidad:
        tipo = 'Calamidad Domestica';
        break;
      case this.paternidad:
        tipo = 'Licencia De Paternidad';
        break;
      case this.maternidad:
        tipo = 'Licencia de maternidad';
        break;
      case this.injustificada:
        tipo = 'Incapaciadad no justificada';
        break;
      default:
        break;
    }
    const i = new Date(this.form.get('inicio').value.toISOString().substr(0, 10));
    const f = new Date(this.form.get('fin').value.toISOString().substr(0, 10));
    const dias = (f.getTime() - i.getTime()) / (1000 * 60 * 60 * 24);
    return new Promise ((res, rej) => {
      this.eService.postAusencia(this.id, tipo, this.Data.descripcion, dias, this.Data.inicio, this.Data.fin, this.id).
      subscribe((resp: any) => {
        res(console.log(resp));
      });
    })
  }

  selectActive( number: number ) {
    this.licencia = false;
    this.vacacines = false;
    this.justificada = false;
    this.calamidad = false;
    this.paternidad = false;
    this.maternidad = false;
    this.injustificada = false;
    this.active = true;
    switch (number) {
      case 1:
        this.licencia = true;
        break;
      case 2:
        this.vacacines = true;
        break;
      case 3:
          this.justificada = true;
          break;
      case 4:
        this.calamidad = true;
        break;
      case 5:
          this.paternidad = true;
          break;
      case 6:
          this.maternidad = true;
          break;
      case 7:
        this.injustificada = true;
        break;
      default:
        break;
    }
  }

  get Data() {
    const data = {
      inicio : Date,
      fin    : Date,
      descripcion: String
    };

    data.inicio = this.form.get('inicio').value.toISOString().substr(0, 10);
    data.fin    = this.form.get('fin').value.toISOString().substr(0, 10);
    data.descripcion = this.form.get('descripcion').value;
    return data;
  }
    exit() {
      this.router.navigate(['home/employee-information/employee-perfil', this.id]);
    }



}
