import {Router} from 'express';


import homeContoller from "../controllers/homeController";
import empleadoController from "../controllers/empleadoController";
import contratoController from "../controllers/contratoController";
import reciboController from "../controllers/reciboController";
import cuentaController from "../controllers/cuentaController";
import loginController from "../controllers/loginController";
import incapacidadController from "../controllers/incapacidadesController";
import deduccionesController from "../controllers/deduccionesController";
import horasExtraController from "../controllers/horasExtraController";
import percepcionesController from "../controllers/percepcionesController";

class HomeRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Menu general administrador
        this.router.get('/', homeContoller.index);

        //Get empleado ok
        this.router.get('/employee-data', empleadoController.get_employee_data);//lista front
        //Crear un nuevo contrato
        this.router.post('/new-contract', contratoController.new_contract);//lista front
        //Crear nueva cuenta bancaria
        this.router.post('/new-account', cuentaController.new_account);//lista front
        //Crear nuevo empleado
        this.router.post('/new-employee', empleadoController.new_employee);//lista front
        //Crear un primer recibo base
        this.router.post('/First-recibe', reciboController.new_receipt);//lista front

        //Busqueda informacion empleado
        this.router.get('/employee-information', empleadoController.view_employee);//lista front

        //Menu empleado
        this.router.get('/employee-information/employee-perfil/:id', empleadoController.employee_perfil);//lista front
        //Informe de pagos
        this.router.get('/employee-information/employee-perfil/payment-report/:id', reciboController.view_recibes);//lista front
        //Recibos de un pago especifico de un empleado
        this.router.get('/employee-information/employee-perfil/payment-report/receipt/:id', reciboController.view_recibe_employee);//no se usa front
        //Editar perfil

        this.router.get('/employee-information/employee-perfil/edit-information/:id', empleadoController.employee_perfil_data);//lista front
        this.router.put('/employee-information/employee-perfil/edit-information/contract/:id', contratoController.edit_contract);//lista front
        this.router.put('/employee-information/employee-perfil/edit-information/account/:id', cuentaController.edit_account);//lista front

        this.router.put('/employee-information/employee-perfil/edit-information/employee/:id', empleadoController.edit_employee);//lista front

        //Reportar inasistencias
        this.router.post('/employee-information/employee-perfil/absences/:id', incapacidadController.new_absence);//lista front
        //Reportar deducciones
        this.router.post('/employee-information/employee-perfil/discounts/:id', deduccionesController.new_discount);//lista front
        //Reportar Horas extra
        this.router.post('/employee-information/employee-perfil/extra-hours/:id', horasExtraController.new_extra_hours);//lista front
        //reportar percepciones
        this.router.post('/employee-information/employee-perfil/perceptions/:id', percepcionesController.new_perception);

        //deduccionesrecibos
        this.router.post('/employee-information/employee-perfil/asignation-discount', deduccionesController.asignation_deduccionesRecibos);//lista front
        //incapacidadesRecibos
        this.router.post('/employee-information/employee-perfil/asignation-absesmce', incapacidadController.asignation_incapacidadesRecibos);//lista front

        //Pagos mes
        this.router.post('/employee-information/employee-perfil/paidment/:id', reciboController.pagoRecibo);//lista front
        //EditarRecibo
        this.router.put('/employee-information/employee-perfil/paidment/edit-receipt/:id', reciboController.editar_recibo);
        //EditarDeducciones
        this.router.put('/employee-information/employee-perfil/paidment/edit-discount/:id', deduccionesController.editar_deducciones);


//Despido empleado
   this.router.post('/fire-employee/paid_liquidacion/:id', reciboController.pagarLiquidacion);
   this.router.post('/fire-employee/fire/:id', empleadoController.despedir);
   this.router.post('/fire-employee/paid_liquidacion/edit_liquidacion/:id', reciboController.editar_liquidacion);

//Historial pagos de nomina*/
this.router.get('/payroll', reciboController.view_all_recibe);

        //Login
        this.router.post('/login', loginController.login);
    }

}

const homeRoutes = new HomeRoutes();
export default homeRoutes.router;


