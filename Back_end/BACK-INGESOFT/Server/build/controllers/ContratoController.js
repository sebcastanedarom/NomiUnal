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
const contratosModel_1 = __importDefault(require("../models/contratosModel"));
const logger_1 = __importDefault(require("../utils/logger"));
class ContratoController {
    new_contract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tipocontrato, fecha_ini, fecha_fin, contrato } = req.body;
            try {
                let newtable = yield contratosModel_1.default.create({
                    id_tipocontrato,
                    fecha_ini,
                    fecha_fin,
                    contrato
                }, {
                    fields: ['id_tipocontrato', 'fecha_ini', 'fecha_fin', 'contrato']
                });
                if (newtable) {
                    const contratoL = JSON.stringify(newtable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Contrato creado: ' + contratoL);
                    const contrato1 = yield contratosModel_1.default.findAll({ where: { contrato: contrato } });
                    res.status(201).json({
                        message: 'contrato agregado',
                        id_contrato: contrato1[0].id_contrato
                    });
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error crear nuevo contrato');
                res.status(500).json({
                    message: 'error'
                });
            }
        });
    }
    edit_contract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_contrato, id_tipocontrato, contrato } = req.body;
            try {
                let editTable = yield contratosModel_1.default.update({
                    id_tipocontrato: id_tipocontrato,
                    contrato: contrato
                }, {
                    where: { id_contrato: id_contrato }
                });
                const contratoL = JSON.stringify(editTable);
                logger_1.default.info('Estado: ' + 201);
                logger_1.default.info('Contrato editado: ');
                res.status(201).json({
                    message: 'contrato editado: ' + contratoL,
                });
            }
            catch (error) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error editar contrato');
                res.status(500).json({
                    message: 'error editar contrato'
                });
            }
        });
    }
}
const contratoController = new ContratoController();
exports.default = contratoController;
