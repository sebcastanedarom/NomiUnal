import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { HttpClient} from '@angular/common/http';
import { Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class EmployeeServiceService {


  constructor( private http: HttpClient ) {
   }

   getEmployees() {
     return this.http.get(`${environment.BACK_URL}/home/employee-information`)
    }



    getEmployee(ide) {
      return this.http.get(`${environment.BACK_URL}/home/employee-information/employee-perfil/${ide}`);
    }

    getEmployeeEdit(ide) {
      return this.http.get(`${environment.BACK_URL}/home/employee-information/employee-perfil/edit-information/${ide}`);
    }

    getData() {
      return this.http.get(`${environment.BACK_URL}/home/employee-data`);
    }

    crearContrato(id_tipocontrato, contrato, fecha_ini, fecha_fin) {
      const body = {
        id_tipocontrato,
        fecha_ini,
        fecha_fin,
        contrato
      };
      return this.http.post(`${environment.BACK_URL}/home/new-contract`, body);
    }

    editContract(id_contrato, id_tipocontrato, contrato, id){
      const body = {
        id_contrato,
        id_tipocontrato,
        contrato,
      };
      return this.http.put(`${environment.BACK_URL}/home/employee-information/employee-perfil/edit-information/contract/${id}`, body);
    }

    crearCuenta(id_banco, numero_cuenta, tipo_cuenta) {
      const body = {
        id_banco,
        numero_cuenta,
        tipo_cuenta
      }
      return this.http.post(`${environment.BACK_URL}/home/new-account`, body);
    }

    editCuneta(id_cuenta, id_banco, numero_cuenta, tipo_cuenta,id){
      const body = {
        id_cuenta,
        id_banco,
        numero_cuenta,
        tipo_cuenta
      };
      return this.http.put(`${environment.BACK_URL}/home/employee-information/employee-perfil/edit-information/account/${id}`, body);
    }

    crearPrimerRecibo(id_empleado,fecha){
      const body ={
        id_empleado,
        fecha
      }
      return this.http.post(`${environment.BACK_URL}/home/First-recibe`, body);
    }

    crearEmpleado(
      nombre,
      tipo_identificacion,
      telefono,
      edad,
      arl,
      eps,
      afp,
      apellido,
      identificacion,
      direccion,
      foto,
      certificadoArl,
      certificadoEps,
      certificadoAfp,
      id_rol,
      id_area,
      id_cargo,
      id_horario,
      fecha_ingreso,
      id_cuenta,
      id_contrato
    ) {
      const body = {
        id_rol,
        id_contrato,
        id_area,
        id_cargo,
        id_horario,
        nombre,
        apellido,
        identificacion,
        tipo_identificacion,
        edad,
        direccion,
        telefono,
        foto,
        fecha_ingreso,
        arl,
        eps,
        afp,
        certificadoArl,
        certificadoEps,
        certificadoAfp,
        id_cuenta
      };
      return this.http.post(`${environment.BACK_URL}/home/new-employee`, body);
    }

    editEmployee(
      id_empleado,
      id_rol,
      id_area,
      id_cargo,
      id_horario,
      nombre,
      apellido,
      identificacion,
      tipo_identificacion,
      direccion,
      telefono,
      foto,
      arl,
      eps,
      afp,
      certificadoArl,
      certificadoEps,
      certificadoAfp,
      id
    ) {
      const body = {
        id_empleado,
        id_rol,
        id_area,
        id_cargo,
        id_horario,
        nombre,
        apellido,
        identificacion,
        tipo_identificacion,
        direccion,
        telefono,
        foto,
        arl,
        eps,
        afp,
        certificadoArl,
        certificadoEps,
        certificadoAfp
      };
      return this.http.put(`${environment.BACK_URL}/home/employee-information/employee-perfil/edit-information/employee/${id}`, body);
    }

    postHorasExtra(
      identificacion,
      fecha,
      numero_horas,
      id
    ) {
      const body = {
        identificacion,
        fecha,
        numero_horas
      };
      return this.http.post(`${environment.BACK_URL}/home/employee-information/employee-perfil/extra-hours/${id}`, body);
    }

    postAusencia(
      identificacion,
      tipo,
      descripcion,
      tiempo_incapacidad,
      fecha_inicio,
      fecha_final,
      id
    ){
      const body = {
      identificacion,
      tipo,
      descripcion,
      tiempo_incapacidad,
      fecha_inicio,
      fecha_final
      }
      return this.http.post(`${environment.BACK_URL}/home/employee-information/employee-perfil/absences/${id}`, body);
    }

    postDeducciones(
      identificacion,
      fecha,
      descripcion,
      valor,
      id
    ) {
      const body = {
        identificacion,
        fecha,
        descripcion,
        valor,
      };
      return this.http.post(`${environment.BACK_URL}/home/employee-information/employee-perfil/discounts/${id}`, body);
    }

    postVerPago(identificacion,id)
    {
      const body = {
        identificacion
      }
      return this.http.post(`${environment.BACK_URL}/home/employee-information/employee-perfil/paidment/${id}`, body);
    }

    postVerPagosEmpleado(
      id
    ) {

      return this.http.get(`${environment.BACK_URL}/home/employee-information/employee-perfil/payment-report/${id}`);
    }

    postAsiganrDeducciones(
      id_recibo,
      id_deduccion,
    ){
      const body = {
      id_recibo,
      id_deduccion,
      }
      return this.http.post(`${environment.BACK_URL}/home/employee-information/employee-perfil/asignation-discount`, body);
    }

    postAsiganrIncapacidades(
      id_recibo,
      id_incapacidad,
    ){
      const body = {
        id_recibo,
        id_incapacidad,
      }
      return this.http.post(`${environment.BACK_URL}/home/employee-information/employee-perfil/asignation-absesmce`, body);
    }

  putPagar(
    identificacion,
    fecha,
    tiempo_trabajado,
    salario,
    cantidad_horas_extra,
    valorT_horas_extra,
    valorT_deducciones,
    valorT_percepciones,
    valorT_incapacidades,
    valor_arl,
    valor_eps,
    valor_afp,
    valor_total,
    recibo,
    id
  ) {
    const body = {
    identificacion,
    fecha,
    tiempo_trabajado,
    salario,
    cantidad_horas_extra,
    valorT_horas_extra,
    valorT_deducciones,
    valorT_percepciones,
    valorT_incapacidades,
    valor_arl,
    valor_eps,
    valor_afp,
    valor_total,
    recibo,
    };
    return this.http.put(`${environment.BACK_URL}/home/employee-information/employee-perfil/paidment/edit-receipt/${id}`, body);
  }

    getToken(nombre, contraseña) {
      const body = {
        nombre,
        contraseña
      };
      return this.http.post(`${environment.BACK_URL}/home/login`, body);
    }
    islogin(): boolean {
      if (localStorage.getItem('token') != null) {
        return true;
      } else {
        return false;
      }
    }
   }


