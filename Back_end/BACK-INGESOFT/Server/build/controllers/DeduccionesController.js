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
const logger_1 = __importDefault(require("../utils/logger"));
const deduccionesModel_1 = __importDefault(require("../models/deduccionesModel"));
const deduccionesRecibosModel_1 = __importDefault(require("../models/deduccionesRecibosModel"));
const deduccionesModel_2 = __importDefault(require("../models/deduccionesModel"));
const empleadosModel_1 = __importDefault(require("../models/empleadosModel"));
class DeduccionesController {
    new_discount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, fecha, descripcion, valor } = req.body;
            const empleado = yield empleadosModel_1.default.findAll({ where: { identificacion: identificacion },
                attributes: ['id_empleado'] });
            const id_empleado = empleado[0].id_empleado;
            try {
                let newtable = yield deduccionesModel_1.default.create({
                    id_empleado,
                    fecha,
                    descripcion,
                    valor,
                }, {
                    fields: ['id_empleado', 'fecha', 'descripcion', 'valor']
                });
                if (newtable) {
                    const deduccion = JSON.stringify(newtable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Deduccion creada: ' + deduccion);
                    res.json({
                        message: 'Deduccion agregada',
                    });
                }
            }
            catch (error) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error crear nueva deduccion');
                res.status(500).json({
                    message: 'Error crear nueva deduccion'
                });
            }
        });
    }
    asignation_deduccionesRecibos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_recibo, id_deduccion } = req.body;
            console.log(id_recibo, id_deduccion);
            try {
                let newtable = yield deduccionesRecibosModel_1.default.create({
                    id_recibo,
                    id_deduccion
                }, {
                    fields: ['id_recibo', 'id_deduccion']
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
    editar_deducciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, id_deduccion } = req.body;
            const empleado = yield empleadosModel_1.default.findAll({ where: { identificacion: identificacion },
                attributes: ['id_empleado'] });
            const id_empleado = empleado[0].id_empleado;
            const deduccion = deduccionesModel_2.default.findAll({ where: { id_deduccion: id_deduccion } });
            const fecha = deduccion[0].fecha;
            const descripcion = deduccion[0].descripcion;
            try {
                let editarDeduccion = yield deduccionesModel_2.default.update({
                    id_empleado,
                    fecha,
                    descripcion,
                    valor: 0
                }, {
                    where: { id_deduccion: id_deduccion }
                });
                if (editarDeduccion) {
                    const deduccionJ = JSON.stringify(editarDeduccion);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('deduccion editada: ' + deduccionJ);
                    res.json({
                        message: 'deduccion editada'
                    });
                }
            }
            catch (e) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error editar deduccion');
                res.status(500).json({
                    message: 'Error editar deduccion'
                });
            }
        });
    }
}
const deduccionesController = new DeduccionesController();
exports.default = deduccionesController;
