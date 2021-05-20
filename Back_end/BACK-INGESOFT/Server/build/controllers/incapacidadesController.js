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
const Producer_1 = __importDefault(require("../Objects/Producer"));
const empleadosModel_1 = __importDefault(require("../models/empleadosModel"));
const logger_1 = __importDefault(require("../utils/logger"));
const incapacidadesRecibosModel_1 = __importDefault(require("../models/incapacidadesRecibosModel"));
class IncapacidadesController {
    new_absence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, tipo, descripcion, tiempo_incapacidad, fecha_inicio, fecha_final } = req.body;
            const empleado = yield empleadosModel_1.default.findAll({
                where: {
                    identificacion: identificacion
                },
                attributes: ['id_empleado']
            });
            const idEmpleado = empleado[0].id_empleado;
            const licenciaData = { idEmpleado, tipo, descripcion, tiempo_incapacidad, fecha_inicio, fecha_final };
            const incapacidades = Producer_1.default.getAbstractFactoryRecibos();
            const incapacidad = incapacidades.createIncapacidad();
            const flag = yield incapacidad.createIncapacidad(licenciaData);
            if (flag) {
                const incapacidadJ = JSON.stringify(licenciaData);
                logger_1.default.info('Estado: ' + 201);
                logger_1.default.info(tipo + ' creada: ' + incapacidadJ);
                res.json({
                    message: 'Incapacidad creada exitosamente',
                });
            }
            else {
                logger_1.default.info('Estado: ' + 201);
                logger_1.default.info('Error crear nueva ' + tipo);
                res.status(500).json({
                    message: 'error al crear Incapacidad'
                });
            }
        });
    }
    asignation_incapacidadesRecibos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_recibo, id_incapacidad } = req.body;
            try {
                let newtable = yield incapacidadesRecibosModel_1.default.create({
                    id_recibo,
                    id_incapacidad
                }, {
                    fields: ['id_recibo', 'id_incapacidad']
                });
                if (newtable) {
                    res.json({
                        message: 'Asignacion realizada'
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.json({
                    message: error
                });
            }
        });
    }
}
const incapacidadController = new IncapacidadesController();
exports.default = incapacidadController;
