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
const cuentaModel_1 = __importDefault(require("../models/cuentaModel"));
const logger_1 = __importDefault(require("../utils/logger"));
class CuentaController {
    new_account(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_banco, numero_cuenta, tipo_cuenta } = req.body;
            try {
                let newtable = yield cuentaModel_1.default.create({
                    id_banco,
                    numero_cuenta,
                    tipo_cuenta
                }, {
                    fields: ['id_banco', 'numero_cuenta', 'tipo_cuenta']
                });
                if (newtable) {
                    const cuentaL = JSON.stringify(newtable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Cuenta creado: ' + cuentaL);
                    const cuenta1 = yield cuentaModel_1.default.findAll({ where: { numero_cuenta: numero_cuenta } });
                    res.json({
                        message: 'cuenta agregada',
                        id_cuenta: cuenta1[0].id_cuenta
                    });
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error crear nueva cuenta');
                res.status(500).json({
                    message: 'error'
                });
            }
        });
    }
    ;
    edit_account(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cuenta, id_banco, numero_cuenta, tipo_cuenta } = req.body;
            try {
                let editTable = yield cuentaModel_1.default.update({
                    id_banco: id_banco,
                    numero_cuenta: numero_cuenta,
                    tipo_cuenta: tipo_cuenta
                }, {
                    where: { id_cuenta: id_cuenta }
                });
                if (editTable) {
                    const cuentaL = JSON.stringify(editTable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Cuenta editada: ' + cuentaL);
                    res.json({
                        message: 'cuenta editada',
                    });
                }
            }
            catch (error) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error editar cuenta');
                res.status(500).json({
                    message: 'Error editar cuenta'
                });
            }
        });
    }
    ;
}
;
const cuentaController = new CuentaController();
exports.default = cuentaController;
