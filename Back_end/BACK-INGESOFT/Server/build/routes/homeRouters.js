"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController_1 = __importDefault(require("../controllers/homeController"));
const empleadoController_1 = __importDefault(require("../controllers/empleadoController"));
const contratoController_1 = __importDefault(require("../controllers/contratoController"));
const reciboController_1 = __importDefault(require("../controllers/reciboController"));
const cuentaController_1 = __importDefault(require("../controllers/cuentaController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const incapacidadesController_1 = __importDefault(require("../controllers/incapacidadesController"));
const deduccionesController_1 = __importDefault(require("../controllers/deduccionesController"));
const horasExtraController_1 = __importDefault(require("../controllers/horasExtraController"));
const percepcionesController_1 = __importDefault(require("../controllers/percepcionesController"));
class HomeRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Menu general administrador
        this.router.get('/', homeController_1.default.index);
        //Get empleado ok
        this.router.get('/employee-data', empleadoController_1.default.get_employee_data); //lista front
        //Crear un nuevo contrato
        this.router.post('/new-contract', contratoController_1.default.new_contract); //lista front
        //Crear nueva cuenta bancaria
        this.router.post('/new-account', cuentaController_1.default.new_account); //lista front
        //Crear nuevo empleado
        this.router.post('/new-employee', empleadoController_1.default.new_employee); //lista front
        //Crear un primer recibo base
        this.router.post('/First-recibe', reciboController_1.default.new_receipt); //lista front
        //Busqueda informacion empleado
        this.router.get('/employee-information', empleadoController_1.default.view_employee); //lista front
        //Menu empleado
        this.router.get('/employee-information/employee-perfil/:id', empleadoController_1.default.employee_perfil); //lista front
        //Informe de pagos
        this.router.get('/employee-information/employee-perfil/payment-report/:id', reciboController_1.default.view_recibes); //lista front
        //Recibos de un pago especifico de un empleado
        this.router.get('/employee-information/employee-perfil/payment-report/receipt/:id', reciboController_1.default.view_recibe_employee); //no se usa front
        //Editar perfil
        this.router.get('/employee-information/employee-perfil/edit-information/:id', empleadoController_1.default.employee_perfil_data); //lista front
        this.router.put('/employee-information/employee-perfil/edit-information/contract/:id', contratoController_1.default.edit_contract); //lista front
        this.router.put('/employee-information/employee-perfil/edit-information/account/:id', cuentaController_1.default.edit_account); //lista front
        this.router.put('/employee-information/employee-perfil/edit-information/employee/:id', empleadoController_1.default.edit_employee); //lista front
        //Reportar inasistencias
        this.router.post('/employee-information/employee-perfil/absences/:id', incapacidadesController_1.default.new_absence); //lista front
        //Reportar deducciones
        this.router.post('/employee-information/employee-perfil/discounts/:id', deduccionesController_1.default.new_discount); //lista front
        //Reportar Horas extra
        this.router.post('/employee-information/employee-perfil/extra-hours/:id', horasExtraController_1.default.new_extra_hours); //lista front
        //reportar percepciones
        this.router.post('/employee-information/employee-perfil/perceptions/:id', percepcionesController_1.default.new_perception);
        //deduccionesrecibos
        this.router.post('/employee-information/employee-perfil/asignation-discount', deduccionesController_1.default.asignation_deduccionesRecibos); //lista front
        //incapacidadesRecibos
        this.router.post('/employee-information/employee-perfil/asignation-absesmce', incapacidadesController_1.default.asignation_incapacidadesRecibos); //lista front
        //Pagos mes
        this.router.post('/employee-information/employee-perfil/paidment/:id', reciboController_1.default.pagoRecibo); //lista front
        //EditarRecibo
        this.router.put('/employee-information/employee-perfil/paidment/edit-receipt/:id', reciboController_1.default.editar_recibo);
        //EditarDeducciones
        this.router.put('/employee-information/employee-perfil/paidment/edit-discount/:id', deduccionesController_1.default.editar_deducciones);
        //Despido empleado
        this.router.post('/fire-employee/paid_liquidacion/:id', reciboController_1.default.pagarLiquidacion);
        this.router.post('/fire-employee/fire/:id', empleadoController_1.default.despedir);
        this.router.post('/fire-employee/paid_liquidacion/edit_liquidacion/:id', reciboController_1.default.editar_liquidacion);
        //Historial pagos de nomina*/
        this.router.get('/payroll', reciboController_1.default.view_all_recibe);
        //Login
        this.router.post('/login', loginController_1.default.login);
    }
}
const homeRoutes = new HomeRoutes();
exports.default = homeRoutes.router;
