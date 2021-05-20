import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.css']
})
export class EditInformationComponent implements OnInit {

  id: string;
  employee: any;
  idCuenta: number;
  idContrato: number;
  idEmployee: number;
  form: FormGroup;
  contratos: any;
  areas: any;
  cargos: any;
  horarios: any;
  bancos: any;
  roles: any;

  constructor(private activateRoute: ActivatedRoute,
              private eService: EmployeeServiceService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.getEmployee(this.id).then(() => {
        this.loadData();
      });
    });
    this.getData();
    this.creatForm();

  }
  creatForm() {
    this.form = this.fb.group({
      nombres        : ['', [Validators.required], []],
      tipoDocumento  : ['', [Validators.required], []],
      celular        : ['', [Validators.required], []],
      banco          : ['', [Validators.required], []],
      arl            : ['', [Validators.required], []],
      eps            : ['', [Validators.required], []],
      afp            : ['', [Validators.required], []],
      apellidos      : ['', [Validators.required], []],
      numeroDocumento: ['', [Validators.required], []],
      direccion      : ['', [Validators.required], []],
      imagen         : ['', [Validators.required], []],
      numeroCuenta   : ['', [Validators.required], []],
      certificadoArl : ['', [Validators.required], []],
      certificadoEps : ['', [Validators.required], []],
      certificadoAfp : ['', [Validators.required], []],
      area           : ['', [Validators.required], []],
      cargo          : ['', [Validators.required], []],
      horario        : ['', [Validators.required], []],
      tipoContrato   : ['', [Validators.required], []],
      tipoCuenta     : ['', [Validators.required], []],
      contrato       : ['', [Validators.required], []],
      rol            : ['', [Validators.required], []],
    });
  }

  loadData() {
    this.form.setValue({
  nombres        : this.employee.nombre,
  tipoDocumento  : this.employee.tipo_identificacion,
  celular        : this.employee.celular,
  banco          : this.employee.banco,
  arl            : this.employee.arl,
  eps            : this.employee.eps,
  afp            : this.employee.afp,
  apellidos      : this.employee.apellido,
  numeroDocumento: this.employee.identificacion,
  direccion      : this.employee.direccion,
  imagen         : this.employee.foto,
  numeroCuenta   : this.employee.numeroCuenta,
  certificadoArl : this.employee.certificadoArl,
  certificadoEps : this.employee.certificadoEps,
  certificadoAfp : this.employee.certificadoAfp,
  area           : this.employee.area,
  cargo          : this.employee.cargo,
  horario        : this.employee.horario,
  tipoContrato   : this.employee.tipoContrato,
  tipoCuenta     : this.employee.tipoCuenta,
  contrato       : this.employee.contrato,
  rol            : this.employee.rol,
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
        'Empleado guardado',
        '',
        'success'
      );
      this.editContract().then(() => {

      });
      this.editCuenta().then(() => {

      });
      this.editEmployee().then(() => {
        this.id = this.DataEmployee.identificacion;
      });

      return this.DataEmployee;

    }
  }

  getData() {
    this.eService.getData().subscribe((resp: any) => {
      this.contratos = resp.tipoContrato;
      this.areas = resp.area;
      this.cargos = resp.cargo;
      this.horarios = resp.horario;
      this.bancos = resp.banco;
      this.roles = resp.role;
    });
  }
  getEmployee(id){
    return new Promise ((res, rej) => {
      this.eService.getEmployeeEdit(id).
      subscribe((resp: any) => {
        this.idCuenta = resp.id_cuenta;
        this.idContrato = resp.id_contrato;
        this.idEmployee = resp.id_empleado;
        res(this.employee = resp);
      });
    });
  }

  editContract() {
    return new Promise((res, rej) => {
      this.eService.editContract(this.idContrato, this.DataEmployee.tipoContrato,
        this.DataEmployee.contrato, this.id)
        .subscribe((resp: any) => {

          res(console.log(resp));
        });
    });
  }

  editCuenta() {
    return new Promise((res, rej) => {
      this.eService.editCuneta(this.idCuenta, this.DataEmployee.banco,
        this.DataEmployee.numeroCuenta, this.DataEmployee.tipoCuenta, this.id)
        .subscribe((resp: any) => {
            res(console.log(resp));
        });
    });
  }

  editEmployee() {
    return new Promise((res, rej) => {
      this.eService.editEmployee(this.idEmployee, this.DataEmployee.rol,
        this.DataEmployee.area, this.DataEmployee.cargo,
        this.DataEmployee.horario, this.DataEmployee.nombre,
        this.DataEmployee.apellido, this.DataEmployee.identificacion,
        this.DataEmployee.tipo_identificacion, this.DataEmployee.direccion,
        this.DataEmployee.celular, this.DataEmployee.foto,
        this.DataEmployee.arl, this.DataEmployee.eps,
        this.DataEmployee.afp, this.DataEmployee.certificadoArl,
        this.DataEmployee.certificadoEps, this.DataEmployee.certificadoAfp, this.id)
        .subscribe((resp: any) => {
          res(console.log(resp));
        })
    })
  }

  exit() {
    this.router.navigate(['home/employee-information/employee-perfil', this.id]);
  }

  get NombresNoValido() {
    return this.form.get('nombres').invalid && this.form.get('nombres').touched;
  }
  get tipoDocumentoNoValido() {
    return this.form.get('tipoDocumento').invalid && this.form.get('tipoDocumento').touched;
  }
  get celularNoValido() {
    return this.form.get('celular').invalid && this.form.get('celular').touched;
  }
  get bancoNoValido() {
    return this.form.get('banco').invalid && this.form.get('banco').touched;
  }
  get arlNoValido() {
    return this.form.get('arl').invalid && this.form.get('arl').touched;
  }
  get epsNoValido() {
    return this.form.get('eps').invalid && this.form.get('eps').touched;
  }
  get afpNoValido() {
    return this.form.get('afp').invalid && this.form.get('afp').touched;
  }
  get apellidosNoValido() {
    return this.form.get('apellidos').invalid && this.form.get('apellidos').touched;
  }
  get numeroDocumentoNoValido() {
    return this.form.get('numeroDocumento').invalid && this.form.get('numeroDocumento').touched;
  }
  get direccionNoValido() {
    return this.form.get('direccion').invalid && this.form.get('direccion').touched;
  }
  get imagenNoValido() {
    return this.form.get('imagen').invalid && this.form.get('imagen').touched;
  }
  get numeroCuentaNoValido() {
    return this.form.get('numeroCuenta').invalid && this.form.get('numeroCuenta').touched;
  }
  get certificadoArlNoValido() {
    return this.form.get('certificadoArl').invalid && this.form.get('certificadoArl').touched;
  }
  get certificadoEpsNoValido() {
    return this.form.get('certificadoEps').invalid && this.form.get('certificadoEps').touched;
  }
  get certificadoAfpNoValido() {
    return this.form.get('certificadoAfp').invalid && this.form.get('certificadoAfp').touched;
  }
  get areaNoValido() {
    return this.form.get('area').invalid && this.form.get('area').touched;
  }
  get cargoNoValido() {
    return this.form.get('cargo').invalid && this.form.get('cargo').touched;
  }
  get horarioNoValido() {
    return this.form.get('horario').invalid && this.form.get('horario').touched;
  }
  get tipoContratoNoValido() {
    return this.form.get('tipoContrato').invalid && this.form.get('tipoContrato').touched;
  }
  get contratoNoValido() {
    return this.form.get('contrato').invalid && this.form.get('contrato').touched;
  }

  get rolNoValido() {
    return this.form.get('rol').invalid && this.form.get('rol').touched;
  }

  get tipoCuentaNoValido() {
    return this.form.get('tipoCuenta').invalid && this.form.get('tipoCuenta').touched;
  }

  get DataEmployee() {
  const e = new EmployeeModel();
  e.nombre         = this.form.get('nombres').value;
  e.tipo_identificacion   = this.form.get('tipoDocumento').value;
  e.celular         = this.form.get('celular').value;
  e.banco           = this.form.get('banco').value;
  e.arl             = this.form.get('arl').value;
  e.eps             = this.form.get('eps').value;
  e.afp             = this.form.get('afp').value;
  e.apellido       = this.form.get('apellidos').value;
  e.identificacion = this.form.get('numeroDocumento').value;
  e.direccion       = this.form.get('direccion').value;
  e.foto          = this.form.get('imagen').value;
  e.numeroCuenta    = this.form.get('numeroCuenta').value;
  e.certificadoArl  = this.form.get('certificadoArl').value;
  e.certificadoEps  = this.form.get('certificadoEps').value;
  e.certificadoAfp  = this.form.get('certificadoAfp').value;
  e.area            = this.form.get('area').value;
  e.cargo           = this.form.get('cargo').value;
  e.horario         = this.form.get('horario').value;
  e.tipoContrato    = this.form.get('tipoContrato').value;
  e.contrato        = this.form.get('contrato').value;
  e.rol             = this.form.get('rol').value;
  e.tipoCuenta      = this.form.get('tipoCuenta').value;
  return e;
  }
}
