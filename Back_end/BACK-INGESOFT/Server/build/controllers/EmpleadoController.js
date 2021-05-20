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
const areasModel_1 = __importDefault(require("../models/areasModel"));
const cargosModel_1 = __importDefault(require("../models/cargosModel"));
const tipoContratosModel_1 = __importDefault(require("../models/tipoContratosModel"));
const horariosModel_1 = __importDefault(require("../models/horariosModel"));
const bancoModel_1 = __importDefault(require("../models/bancoModel"));
const rolesModel_1 = __importDefault(require("../models/rolesModel"));
const cuentaModel_1 = __importDefault(require("../models/cuentaModel"));
const contratosModel_1 = __importDefault(require("../models/contratosModel"));
const empleadosModel_2 = __importDefault(require("../models/empleadosModel"));
class EmpleadoController {
    get_employee_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipoContrato = yield tipoContratosModel_1.default.findAll();
                const area = yield areasModel_1.default.findAll();
                const cargo = yield cargosModel_1.default.findAll();
                const horario = yield horariosModel_1.default.findAll();
                const banco = yield bancoModel_1.default.findAll();
                const role = yield rolesModel_1.default.findAll();
                logger_1.default.info('Estado: ' + 200);
                const tipoContratoL = JSON.stringify(tipoContrato);
                const cargosL = JSON.stringify(cargo);
                const areasL = JSON.stringify(area);
                const horariosL = JSON.stringify(horario);
                const bancosL = JSON.stringify(banco);
                const rolesL = JSON.stringify(role);
                logger_1.default.log({
                    level: 'info',
                    message: 'Data encontrada: \nContratos: ' + tipoContratoL + '\nCargos: ' + cargosL + '\nAreas: ' + areasL +
                        '\nHorarios: ' + horariosL + '\nBancos: ' + bancosL + '\nRoles: ' + rolesL
                });
                res.status(200).json({ tipoContrato, area, cargo, horario, banco, role });
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error ');
                res.status(500).json({
                    message: 'error'
                });
            }
        });
    }
    new_employee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bcrypt = require('bcrypt');
            const { id_rol, id_cuenta, id_contrato, id_area, id_cargo, id_horario, nombre, apellido, identificacion, tipo_identificacion, edad, direccion, telefono, foto, fecha_ingreso, arl, eps, afp, certificadoArl, certificadoEps, certificadoAfp } = req.body;
            try {
                let newtable = yield empleadosModel_1.default.create({
                    id_rol,
                    id_cuenta,
                    id_contrato,
                    id_area,
                    id_cargo,
                    id_horario,
                    nombre,
                    apellido,
                    identificacion,
                    tipo_identificacion,
                    contraseña: bcrypt.hashSync(id_rol + identificacion, 10),
                    edad,
                    direccion,
                    telefono,
                    foto,
                    fecha_ingreso,
                    activo: true,
                    fecha_salida: null,
                    arl,
                    eps,
                    afp,
                    certificadoArl,
                    certificadoEps,
                    certificadoAfp
                }, {
                    fields: ['id_rol', 'id_cuenta', 'id_contrato', 'id_area', 'id_cargo', 'id_horario', 'nombre',
                        'apellido', 'identificacion', 'tipo_identificacion', 'contraseña', 'edad', 'direccion', 'telefono', 'foto', 'fecha_ingreso', 'activo',
                        'fecha_salida', 'arl', 'eps', 'afp', 'certificadoArl', 'certificadoEps', 'certificadoAfp']
                });
                if (newtable) {
                    const empleado = JSON.stringify(newtable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Empleado creado: ' + empleado);
                    const empleado1 = yield empleadosModel_1.default.findAll({ where: { identificacion: identificacion } });
                    res.json({
                        message: 'Empleado agregado',
                        id_empleado: empleado1[0].id_empleado
                    });
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error crear nuevo empleado');
                res.status(500).json({
                    message: 'error'
                });
            }
        });
    }
    view_employee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleado = yield empleadosModel_1.default.findAll({
                    where: {
                        activo: 1
                    },
                    attributes: ['nombre', 'apellido', 'identificacion', 'foto', 'id_area', 'id_cargo']
                });
                const cargos = [];
                const areas = [];
                for (let i = 0; i < empleado.length; i++) {
                    areas.push(yield areasModel_1.default.findAll({
                        where: {
                            id_area: empleado[i].id_area
                        },
                        attributes: ['nombre_area']
                    }));
                    cargos.push(yield cargosModel_1.default.findAll({
                        where: {
                            id_cargo: empleado[i].id_cargo
                        },
                        attributes: ['nombre_cargo']
                    }));
                }
                logger_1.default.info('Estado: ' + 200);
                logger_1.default.log({
                    level: 'info',
                    message: 'Empleados encontrados exitosamente'
                });
                res.status(200).json({ empleado, areas, cargos });
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error encontrar empleados');
                res.status(500).json({
                    message: 'error encontrar empleados'
                });
            }
        });
    }
    employee_perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleado = yield empleadosModel_1.default.findAll({ where: { identificacion: req.params.id } });
                logger_1.default.info('Estado: ' + 200);
                logger_1.default.log({
                    level: 'info',
                    message: 'Empleado encontrado exitosamente: ' + empleado
                });
                res.status(200).json({ empleado });
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error encontrar empleado');
                res.status(500).json({
                    message: 'error encontrar empleado'
                });
            }
        });
    }
    employee_perfil_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleado = yield empleadosModel_1.default.findOne({ where: { identificacion: req.params.id } });
                const cuenta = yield cuentaModel_1.default.findOne({
                    where: { id_cuenta: empleado.id_cuenta }
                });
                const contrato = yield contratosModel_1.default.findOne({
                    where: {
                        id_contrato: empleado.id_contrato
                    }
                });
                let empleadoFornt = {
                    nombre: empleado.nombre,
                    tipo_identificacion: empleado.tipo_identificacion,
                    celular: empleado.telefono,
                    banco: cuenta.id_banco,
                    arl: empleado.arl,
                    eps: empleado.eps,
                    afp: empleado.afp,
                    apellido: empleado.apellido,
                    identificacion: empleado.identificacion,
                    direccion: empleado.direccion,
                    foto: empleado.foto,
                    numeroCuenta: cuenta.numero_cuenta,
                    tipoCuenta: cuenta.tipo_cuenta,
                    certificadoArl: empleado.certificadoAfp,
                    certificadoEps: empleado.certificadoEps,
                    certificadoAfp: empleado.certificadoAfp,
                    area: empleado.id_area,
                    cargo: empleado.id_cargo,
                    horario: empleado.id_horario,
                    tipoContrato: contrato.id_tipocontrato,
                    contrato: contrato.contrato,
                    rol: empleado.id_rol,
                    // las siguientes son para el manejo de id al modificar las cuentas no hacen parte del modelo en el front
                    id_cuenta: empleado.id_cuenta,
                    id_contrato: empleado.id_contrato,
                    id_empleado: empleado.id_empleado,
                };
                logger_1.default.info('Estado: ' + 200);
                logger_1.default.log({
                    level: 'info',
                    message: 'Data perfil encontrada:\nempleado: ' + empleadoFornt
                });
                res.status(200).json(empleadoFornt);
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error encontrar data empleado');
                res.status(500).json({
                    message: 'error encontrar data empleado'
                });
            }
        });
    }
    edit_employee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_empleado, id_rol, id_area, id_cargo, id_horario, nombre, apellido, identificacion, tipo_identificacion, direccion, telefono, foto, arl, eps, afp, certificadoArl, certificadoEps, certificadoAfp } = req.body;
            try {
                let editTable = yield empleadosModel_1.default.update({
                    id_rol: id_rol,
                    id_area: id_area,
                    id_cargo: id_cargo,
                    id_horario: id_horario,
                    nombre: nombre,
                    apellido: apellido,
                    identificacion: identificacion,
                    tipo_identificacion: tipo_identificacion,
                    direccion: direccion,
                    telefono: telefono,
                    foto: foto,
                    arl: arl,
                    eps: eps,
                    afp: afp,
                    certificadoArl: certificadoArl,
                    certificadoEps: certificadoEps,
                    certificadoAfp: certificadoAfp
                }, {
                    where: { id_empleado: id_empleado }
                });
                if (editTable) {
                    const empleado = JSON.stringify(editTable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Empleado editado: ' + empleado);
                    res.json({
                        message: 'Empleado editado'
                    });
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error editar empleado');
                res.status(500).json({
                    message: 'Error editar empleado'
                });
            }
        });
    }
    despedir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, fecha_salida } = req.body;
            const empleado = yield empleadosModel_2.default.findAll({
                where: { identificacion: identificacion },
                attributes: ['id_empleado']
            });
            const id_empleado = empleado[0].id_empleado;
            try {
                let editTable = yield empleadosModel_1.default.update({
                    activo: false,
                    fecha_salida: fecha_salida
                }, {
                    where: { id_empleado: id_empleado }
                });
                if (editTable) {
                    const empleadoJ = JSON.stringify(editTable);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Empleado despedido: ' + empleadoJ);
                    res.json({
                        message: 'Empleado despedido'
                    });
                }
            }
            catch (error) {
                console.log(error);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error despedir empleado');
                res.status(500).json({
                    message: 'Error despedir empleado'
                });
            }
        });
    }
}
const empleadoController = new EmpleadoController();
exports.default = empleadoController;
