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
const horasExtraModel_1 = __importDefault(require("../models/horasExtraModel"));
const recibosModel_1 = __importDefault(require("../models/recibosModel"));
const empleadosModel_1 = __importDefault(require("../models/empleadosModel"));
class HorasExtraController {
    new_extra_hours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, fecha, numero_horas } = req.body;
            const id_empleado = yield empleadosModel_1.default.findAll({ where: { identificacion: identificacion },
                attributes: ['id_empleado'] });
            const reciboActual = yield recibosModel_1.default.findOne({ where: { id_empleado: id_empleado[0].id_empleado },
                attributes: ['id_recibo'] });
            const id_recibo = reciboActual.id_recibo;
            try {
                let newtable = yield horasExtraModel_1.default.create({
                    id_recibo,
                    fecha,
                    numero_horas
                }, {
                    fields: ['id_recibo', 'fecha', 'numero_horas']
                });
                if (newtable) {
                    const horasExtra = JSON.stringify(newtable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('horas extra creadas: ' + horasExtra);
                    res.json({
                        message: 'Horas extra agregadas',
                    });
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error crear nuevas horas extra');
                res.status(500).json({
                    message: 'Error crear nuevas horas extra'
                });
            }
        });
    }
}
const horasExtraController = new HorasExtraController();
exports.default = horasExtraController;
