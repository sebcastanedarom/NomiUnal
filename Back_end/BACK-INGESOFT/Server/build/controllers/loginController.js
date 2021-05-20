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
const logger_1 = __importDefault(require("../utils/logger"));
const jwt = require("jsonwebtoken");
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bcrypt = require('bcrypt');
            const { nombre, contraseña } = req.body;
            try {
                const empleado = yield empleadosModel_1.default.findAll({
                    where: {
                        nombre: nombre,
                    },
                    attributes: ['id_empleado', 'contraseña']
                });
                const match = bcrypt.compareSync(contraseña.toString(), empleado[0].contraseña);
                if (match) {
                    const idEmpleado = empleado[0].id_empleado;
                    const token = jwt.sign({ id: idEmpleado }, "secretkey");
                    const tokenL = JSON.stringify(token);
                    logger_1.default.info('Estato: 200');
                    logger_1.default.info('Empleado encontrado: ' + tokenL);
                    return res.status(200).json({ token });
                }
                else {
                    return res.status(500).json('datos incorrectos');
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Contraseña no encontrada');
                return res.status(401).send("Contraseña incorrecta");
            }
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
