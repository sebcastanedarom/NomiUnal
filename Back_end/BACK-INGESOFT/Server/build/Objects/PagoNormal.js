"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const empleadosModel_1 = __importDefault(require("../models/empleadosModel"));
const recibosModel_1 = __importDefault(require("../models/recibosModel"));
const sequelize_1 = __importDefault(require("sequelize"));
const deduccionesModel_1 = __importDefault(require("../models/deduccionesModel"));
const incapacidadesModel_1 = __importDefault(require("../models/incapacidadesModel"));
const percepcionesModel_1 = __importDefault(require("../models/percepcionesModel"));
const horasExtraModel_1 = __importDefault(require("../models/horasExtraModel"));
const areasCargosModel_1 = __importDefault(require("../models/areasCargosModel"));
const cuentaModel_1 = __importDefault(require("../models/cuentaModel"));
const bancoModel_1 = __importDefault(require("../models/bancoModel"));
class PagoNormal {
    appyPago(identificacion) {
        return __awaiter(this, void 0, void 0, function* () {
            const empleado = yield empleadosModel_1.default.findAll({ where: { identificacion: identificacion },
                attributes: ['id_empleado', 'id_area', 'id_cargo', 'id_cuenta'] });
            const recibo = yield recibosModel_1.default.findOne({ where: { id_empleado: empleado[0].id_empleado },
                attributes: ['id_recibo', 'fecha'] });
            const { Op } = sequelize_1.default;
            const deduccion = yield deduccionesModel_1.default.findAll({
                where: {
                    id_empleado: empleado[0].id_empleado,
                    valor: { [Op.gt]: 0 }
                }
            });
            let fecha = new Date(recibo.fecha);
            let fechas = fecha.getFullYear().toString() + ' ' + fecha.getMonth().toString() + ' ' + '28';
            fecha = new Date(fechas);
            const incapacidad = yield incapacidadesModel_1.default.findAll({
                where: {
                    id_empleado: empleado[0].id_empleado,
                    fecha_inicio: { [Op.or]: [{ [Op.lte]: recibo.fecha }, { [Op.gt]: fecha }] }
                }
            });
            const percepcion = yield percepcionesModel_1.default.findAll({ where: { id_recibo: recibo.id_recibo } });
            const horaExtra = yield horasExtraModel_1.default.findAll({ where: { id_recibo: recibo.id_recibo } });
            const salarioB = yield areasCargosModel_1.default.findAll({ where: { id_area: empleado[0].id_area, id_cargo: empleado[0].id_cargo },
                attributes: ['salarioBase'] });
            let salario = salarioB[0].salarioBase;
            var diasNoTrabajo = 0;
            var idIncapacidades = [];
            for (let i = 0; i < incapacidad.length; i++) {
                if (incapacidad[i].tipo == ("Licencia No remunerada") || incapacidad[i].tipo == ("Incapacidad no Justificada")) {
                    diasNoTrabajo = incapacidad[i].tiempo_incapacidad + diasNoTrabajo;
                }
                idIncapacidades.push(incapacidad[i].id_incapacidad);
            }
            const diasTrabajado = 30 - diasNoTrabajo;
            const valorIncapacidad = (diasNoTrabajo * salario / 30);
            var idDeducciones = [];
            var deduccionesTotal = 0;
            for (let i = 0; i < deduccion.length; i++) {
                deduccionesTotal = deduccionesTotal + deduccion[i].valor;
                idDeducciones.push(deduccion[0].id_deduccion);
            }
            var horasExtras = 0;
            var valorHoras = 0;
            for (let i = 0; i < horaExtra.length; i++) {
                horasExtras = horasExtras + horaExtra[0].numero_horas;
                valorHoras = valorHoras + (horaExtra[0].numero_horas * (salario / 240) * 0.25);
            }
            const arl = salario * 0.0522;
            const afp = salario * 0.165;
            const eps = salario * 0.125;
            var PercepTotal = 0;
            for (let i = 0; i < percepcion.length; i++) {
                PercepTotal = PercepTotal + percepcion[i].valor;
            }
            const salarioF = salario - valorIncapacidad - eps - afp + valorHoras + PercepTotal;
            const cuenta = yield cuentaModel_1.default.findAll({ where: { id_cuenta: empleado[0].id_cuenta },
                attributes: ['id_banco', 'numero_cuenta'] });
            const ncuenta = cuenta[0].numero_cuenta;
            const banco = yield bancoModel_1.default.findAll({ where: { id_banco: cuenta[0].id_banco },
                attributes: ['nombre_banco'] });
            return { recibo, salario, diasTrabajado, deduccionesTotal, PercepTotal, valorIncapacidad, horasExtras,
                valorHoras, arl, afp, eps, salarioF, banco, ncuenta, idIncapacidades, idDeducciones };
        });
    }
}
exports.default = PagoNormal;
