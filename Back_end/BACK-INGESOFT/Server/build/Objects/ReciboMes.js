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
const recibosModel_1 = __importDefault(require("../models/recibosModel"));
const logger_1 = __importDefault(require("../utils/logger"));
class ReciboMes {
    constructor(reciboData) {
        this.reciboMes = reciboData;
    }
    createRecibo(id_empleado, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newtable = yield recibosModel_1.default.create({
                    id_empleado,
                    tipo: "Recibo mes",
                    fecha: fecha,
                    tiempo_trabajado: 0,
                    salario: 0,
                    cantidad_horas_extra: null,
                    valorT_horas_extra: null,
                    valorT_deducciones: null,
                    valorT_percepciones: null,
                    valorT_incapacidades: null,
                    valor_impuestos: 0,
                    valor_arl: 0,
                    valor_eps: 0,
                    valor_afp: 0,
                    valor_total: 0,
                    fecha_liquidacion: 0,
                    dias_liquidacion: 0,
                    cesantias: 0,
                    recibo: ''
                }, {
                    fields: ['id_empleado', 'fecha', 'tiempo_trabajado', 'salario', 'cantidad_horas_extra', 'valorT_horas_extra', 'valorT_deducciones',
                        'valorT_percepciones', 'valorT_incapacidades', 'valor_impuestos', 'valor_arl', 'valor_eps', 'valor_afp', 'valor_total',
                        'fecha_liquidacion', 'dias_liquidacion', 'cesantias', 'recibo']
                });
                if (newtable) {
                    const recibo = JSON.stringify(newtable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Recibos creado: ' + recibo);
                    return true;
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error crear nuevo recibo');
                return false;
            }
            return false;
        });
    }
}
exports.default = ReciboMes;
