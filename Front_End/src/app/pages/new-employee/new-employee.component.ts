import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EmployeeModel } from '../../models/employee.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeServiceService } from '../../services/employee-service.service';



@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  form: FormGroup;
  contratos: any;
  areas: any;
  cargos: any;
  horarios: any;
  bancos: any;
  roles: any;
  idContrato: any;
  idCuenta: any;
  idEmpleado: any;
  edad: any;


  constructor(private fb: FormBuilder,
              private router: Router,
              private eService: EmployeeServiceService) {
                this.getData();
   }

  ngOnInit(): void {
    this.creatForm();

  }

  creatForm() {
    this.form = this.fb.group({
      nombres        : ['', [Validators.required], []],
      tipoDocumento  : ['', [Validators.required], []],
      celular        : ['', [Validators.required], []],
      fechaNacimiento: ['', [Validators.required], []],
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
      contrato       : ['', [Validators.required], []],
      rol            : ['', [Validators.required], []],
      tipoCuenta     : ['', [Validators.required], []],
      fechaIngreso   : ['', [Validators.required], []],
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
      const promises = [];
      promises.push(this.crearContrato().then());
      promises.push(this.crearCuenta().then());
      promises.push(this.calcularEdad().then());
      Promise.all(promises).then(() => {
        // console.log(this.idContrato);
        // console.log(this.idCuenta);
        this.crearEmpleado().then(() => {
          // console.log(this.idEmpleado);
          this.crearPrimerRecibo();
        });
        //this.form.reset();
        //this.loadData();
      });
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

  crearContrato() {// fecha inicio fecha finalizacion
    return new Promise((res, rej) => {
      this.eService.crearContrato(this.Employee.tipoContrato,
      this.Employee.contrato, this.Employee.fechaIngreso.toISOString().substr(0, 10), '2030-12-12')
      .subscribe((resp: any) => {
        res(this.idContrato = resp.id_contrato);
      });
    });
  }

  crearCuenta() {// tipocuenta
    return new Promise ((res, rej) => {
      this.eService.crearCuenta(this.Employee.banco,
      this.Employee.numeroCuenta, this.form.get('tipoCuenta').value )
      .subscribe((resp: any) => {
        res(this.idCuenta = resp.id_cuenta);
      });
    });
  }

  crearPrimerRecibo() {
    const fecha = new Date(this.Employee.fechaIngreso);
    fecha.setDate(28);
    return new Promise ((res, rej) => {
      this.eService.crearPrimerRecibo(this.idEmpleado, fecha)
      .subscribe((resp: any) => {
        res(resp);
      });
    });
  }

  crearEmpleado() {
    return new Promise ((res, rej) => {
      this.eService.crearEmpleado(
        this.Employee.nombre,
        this.Employee.tipo_identificacion,
        this.Employee.celular,
        this.edad,
        this.Employee.arl,
        this.Employee.eps,
        this.Employee.afp,
        this.Employee.apellido,
        this.Employee.identificacion,
        this.Employee.direccion,
        this.Employee.foto,
        this.Employee.certificadoArl,
        this.Employee.certificadoEps,
        this.Employee.certificadoAfp,
        this.Employee.rol,
        this.Employee.area,
        this.Employee.cargo,
        this.Employee.horario,
        this.Employee.fechaIngreso,
        this.idCuenta,
        this.idContrato)
      .subscribe((resp: any) => {
        res(this.idEmpleado = resp.id_empleado);
      });
    });
  }



  exit() {
    this.router.navigate(['/home']);
  }

  calcularEdad() {
    return new Promise((res, rej) => {
      const hoy        = new Date();
      const nacimiento = this.Employee.fechaNacimiento;
      let edad       = hoy.getFullYear() - nacimiento.getFullYear();
      const mes        = hoy.getMonth() - nacimiento.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      res(this.edad = edad);
    });
  }

  loadData() {
    this.form.setValue({
  nombres        : '',
  tipoDocumento  : '',
  celular        : '',
  fechaNacimiento: '',
  banco          : '',
  arl            : '',
  eps            : '',
  afp            : '',
  apellidos      : '',
  numeroDocumento: '',
  direccion      : '',
  imagen         : '',
  numeroCuenta   : '',
  certificadoArl : '',
  certificadoEps : '',
  certificadoAfp : '',
  area           : '',
  cargo          : '',
  horario        : '',
  tipoContrato   : '',
  contrato       : '',
  rol            : '',
  tipoCuenta     : '',
  fechaIngreso   : '',
    });
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
  get fechaNacimientoNoValido() {
    return this.form.get('fechaNacimiento').invalid && this.form.get('fechaNacimiento').touched;
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

  get fechaIngresoNoValido() {
    return this.form.get('fechaIngreso').invalid && this.form.get('fechaIngreso').touched;
  }

  get Employee() {
  const e = new EmployeeModel();
  e.nombre         = this.form.get('nombres').value;
  e.tipo_identificacion   = this.form.get('tipoDocumento').value;
  e.celular         = this.form.get('celular').value;
  e.fechaNacimiento = new Date(this.form.get('fechaNacimiento').value);
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
  e.fechaIngreso    = new Date ( this.form.get('fechaIngreso').value );
  return e;
  }

}
