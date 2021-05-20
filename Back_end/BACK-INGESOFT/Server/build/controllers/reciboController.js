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
const Producer_1 = __importDefault(require("../Objects/Producer"));
const recibosModel_2 = __importDefault(require("../models/recibosModel"));
const empleadosModel_1 = __importDefault(require("../models/empleadosModel"));
const empleadosModel_2 = __importDefault(require("../models/empleadosModel"));
const areasModel_1 = __importDefault(require("../models/areasModel"));
const cargosModel_1 = __importDefault(require("../models/cargosModel"));
const contratosModel_1 = __importDefault(require("../models/contratosModel"));
const tipoContratosModel_1 = __importDefault(require("../models/tipoContratosModel"));
const sequelize_1 = __importDefault(require("sequelize"));
class ReciboController {
    new_receipt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_empleado, fecha } = req.body;
            const recibo = Producer_1.default.getAbstractFactoryRecibos();
            const reciboMes = recibo.createRecibo("Recibo mes");
            const flag = yield reciboMes.createRecibo(id_empleado, fecha);
            if (flag) {
                res.json({
                    message: 'Recibos creado exitosamente',
                });
            }
            else {
                res.status(500).json({
                    message: 'error'
                });
            }
        });
    }
    view_recibes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.id);
                const empleado = yield empleadosModel_1.default.findAll({ where: { identificacion: req.params.id },
                    attributes: ['id_empleado', 'nombre', 'apellido', 'identificacion', 'id_area', 'id_cargo'] });
                const areas = yield areasModel_1.default.findAll({ where: { id_area: empleado[0].id_area },
                    attributes: ['nombre_area'] });
                const area = areas[0].nombre_area;
                const cargos = yield cargosModel_1.default.findAll({ where: { id_cargo: empleado[0].id_cargo },
                    attributes: ['nombre_cargo'] });
                const cargo = cargos[0].nombre_cargo;
                const recibo = yield recibosModel_1.default.findAll({
                    where: {
                        id_empleado: empleado[0].id_empleado
                    },
                    attributes: ['id_recibo', 'valor_total', 'fecha']
                });
                logger_1.default.info('Estado: ' + 200);
                logger_1.default.log({
                    level: 'info',
                    message: 'Recibos encontrados exitosamente: ' + recibo
                });
                res.status(200).json({ recibo, empleado, area, cargo });
            }
            catch (e) {
                console.log(e);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error encontrar recibos');
                res.status(500).json({
                    message: 'error encontrar recibos'
                });
            }
        });
    }
    view_recibe_employee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { identificacion, id_recibo } = req.body;
                const empleado = empleadosModel_1.default.findAll({ where: { identificacion: identificacion },
                    attributes: ['id_empleado', 'nombre', 'apellido', 'identificacion', 'id_area', 'id_cargo'] });
                const areas = yield areasModel_1.default.findAll({ where: { id_area: empleado[0].id_area },
                    attributes: ['nombre_area'] });
                const area = areas[0].nombre_area;
                const cargos = yield areasModel_1.default.findAll({ where: { id_cargo: empleado[0].id_cargo },
                    attributes: ['nombre_cargo'] });
                const cargo = cargos[0].nombre_cargo;
                const recibo = yield recibosModel_1.default.findAll({
                    where: {
                        id_empleado: empleado[0].id_empleado,
                        id_recibo: id_recibo
                    }
                });
                logger_1.default.info('Estado: ' + 200);
                logger_1.default.log({
                    level: 'info',
                    message: 'Recibos seleccionado encontrado exitosamente: ' + recibo
                });
                res.status(200).json({ recibo, empleado, cargo, area });
            }
            catch (e) {
                console.log(e);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error encontrar recibo de empleado');
                res.status(500).json({
                    message: 'error encontrar recibo de empleado'
                });
            }
        });
    }
    editar_recibo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, fecha, tiempo_trabajado, salario, cantidad_horas_extra, valorT_horas_extra, valorT_deducciones, valorT_percepciones, valorT_incapacidades, valor_arl, valor_eps, valor_afp, valor_total, recibo } = req.body;
            const empleado = yield empleadosModel_1.default.findOne({ where: { identificacion: identificacion },
                attributes: ['id_empleado'] });
            console.log(empleado.id_empleado);
            const id_empleado = empleado.id_empleado;
            const reciboActual = yield recibosModel_2.default.findOne({ where: { id_empleado: id_empleado },
                attributes: ['id_recibo'] });
            const id_recibo = reciboActual.id_recibo;
            console.log(id_recibo);
            try {
                //let recibop = await  recibos.findOne({where:{id_recibo: id_recibo}});
                // console.log(recibop)
                let editarRecibo = yield recibosModel_2.default.update({
                    id_empleado: id_empleado,
                    fecha: fecha,
                    tiempo_trabajado: tiempo_trabajado,
                    salario: salario,
                    cantidad_horas_extra: cantidad_horas_extra,
                    valorT_horas_extra: valorT_horas_extra,
                    valorT_deducciones: valorT_deducciones,
                    valorT_percepciones: valorT_percepciones,
                    valorT_incapacidades: valorT_incapacidades,
                    valor_arl: valor_arl,
                    valor_eps: valor_eps,
                    valor_afp: valor_afp,
                    valor_total: valor_total,
                    fecha_liquidacion: null,
                    dias_liquidacion: null,
                    cesantias: 0,
                    recibo: recibo
                }, {
                    where: { id_recibo: id_recibo }
                });
                if (editarRecibo) {
                    const reciboj = JSON.stringify(editarRecibo);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Recibos editado: ' + reciboj);
                    res.json({
                        message: 'Recibos editado'
                    });
                }
            }
            catch (e) {
                console.log(e);
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error editar Recibos');
                res.status(500).json({
                    message: 'Error editar Recibos'
                });
            }
        });
    }
    pagoRecibo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { identificacion } = req.body;
                const empleado = yield empleadosModel_1.default.findAll({ where: { identificacion: identificacion },
                    attributes: ['id_empleado', 'id_contrato', 'nombre', 'apellido', 'identificacion', 'id_area', 'id_cargo'] });
                const areas = yield areasModel_1.default.findAll({ where: { id_area: empleado[0].id_area },
                    attributes: ['nombre_area'] });
                const area = areas[0].nombre_area;
                const cargos = yield cargosModel_1.default.findAll({ where: { id_cargo: empleado[0].id_cargo },
                    attributes: ['nombre_cargo'] });
                const cargo = cargos[0].nombre_cargo;
                const contrato = yield contratosModel_1.default.findAll({ where: { id_contrato: empleado[0].id_contrato },
                    attributes: ['id_tipocontrato'] });
                const tipoContrato = yield tipoContratosModel_1.default.findAll({ where: { id_tipo: contrato[0].id_tipocontrato },
                    attributes: ['descripcion'] });
                var tipo = "Pago Normal";
                if (tipoContrato[0].descripcion == ("Contratista")) {
                    tipo = "Pago Contratista";
                }
                const recibo = Producer_1.default.getAbstractFactoryRecibos();
                const reciboPago = recibo.executePago(tipo);
                logger_1.default.info('Estado: ' + 200);
                logger_1.default.log({
                    level: 'info',
                    message: 'Recibos de pago'
                });
                const info = yield reciboPago.appyPago(identificacion);
                res.status(200).json({ empleado, area, cargo, info });
            }
            catch (e) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.log({
                    level: 'info',
                    message: 'Error Informacion pago recibo'
                });
                res.status(500).json({
                    message: 'Error Informacion pago recibo'
                });
            }
        });
    }
    view_all_recibe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empleado = yield empleadosModel_2.default.findAll({
                    attributes: ['id_empleado', 'activo', 'nombre', 'apellido', 'identificacion', 'foto', 'id_area', 'id_cargo']
                });
                const recibo = [];
                const { Op } = sequelize_1.default;
                for (let i = 0; i < empleado.length; i++) {
                    recibo.push(yield recibosModel_2.default.findAll({
                        where: {
                            id_empleado: empleado[i].id_empleado,
                            valor_total: { [Op.gt]: 0 }
                        },
                        attributes: ['id_recibo', 'valor_total', 'fecha']
                    }));
                }
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
                    message: 'Recibos de todos los empleados'
                });
                res.status(200).json({ recibo, empleado, areas, cargos });
            }
            catch (e) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.log({
                    level: 'info',
                    message: 'Error Todos los recibos de pago'
                });
                res.status(500).json({
                    message: 'Error Todos los recibos de pago'
                });
            }
        });
    }
    pagarLiquidacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { identificacion } = req.body;
                console.log(identificacion);
                const empleado = yield empleadosModel_1.default.findAll({
                    where: { identificacion: identificacion },
                    attributes: ['id_empleado', 'id_contrato', 'nombre', 'apellido', 'identificacion',
                        'id_area', 'id_cargo', 'fecha_ingreso']
                });
                const areas = yield areasModel_1.default.findAll({
                    where: { id_area: empleado[0].id_area },
                    attributes: ['nombre_area']
                });
                const area = areas[0].nombre_area;
                const cargos = yield areasModel_1.default.findAll({
                    where: { id_cargo: empleado[0].id_cargo },
                    attributes: ['nombre_cargo']
                });
                const cargo = cargos[0].nombre_cargo;
                const contrato = yield contratosModel_1.default.findAll({
                    where: { id_contrato: empleado[0].id_contrato },
                    attributes: ['id_tipocontrato']
                });
                const tipoContrato = yield tipoContratosModel_1.default.findAll({
                    where: { id_tipo: contrato[0].id_tipocontrato },
                    attributes: ['descripcion']
                });
                var tipo = "Pago Normal";
                if (tipoContrato[0].descripcion == ("Contratista")) {
                    tipo = "Pago Contratista";
                }
                const recibo = Producer_1.default.getAbstractFactoryRecibos();
                const reciboPago = recibo.executePago(tipo);
                const info = yield reciboPago.appyPago(identificacion);
                const cesantias = info.salario;
                const valorTotalLiq = info.salarioF + cesantias;
                logger_1.default.info('Estado: ' + 200);
                logger_1.default.log({
                    level: 'info',
                    message: 'Recibos de pago liquidacion'
                });
                res.status(200).json({ empleado, area, cargo, info, cesantias, valorTotalLiq });
            }
            catch (e) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.log({
                    level: 'info',
                    message: 'Error Informacion pago recibo liquidacion'
                });
                res.status(500).json({
                    message: 'Error Informacion pago recibo liquidacion'
                });
            }
        });
    }
    editar_liquidacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identificacion, fecha, tiempo_trabajado, salario, cantidad_horas_extra, valorT_horas_extra, valorT_deducciones, valorT_percepciones, valorT_incapacidades, valor_arl, valor_eps, valor_afp, valor_total, fecha_liquidacion, dias_liquidacion, cesantias, recibo } = req.body;
            const id_empleado = empleadosModel_1.default.findAll({ where: { identificacion: identificacion },
                attributes: ['id_empleado'] });
            const reciboActual = recibosModel_2.default.findOne({ where: { id_empleado: id_empleado[0].id_empleado },
                attributes: ['id_recibo'] });
            const id_recibo = reciboActual.id_recibo;
            try {
                let editarRecibo = yield recibosModel_2.default.update({
                    id_empleado: id_empleado,
                    tipo: "Liquidacion",
                    fecha: fecha,
                    tiempo_trabajado: tiempo_trabajado,
                    salario: salario,
                    cantidad_horas_extra: cantidad_horas_extra,
                    valorT_horas_extra: valorT_horas_extra,
                    valorT_deducciones: valorT_deducciones,
                    valorT_percepciones: valorT_percepciones,
                    valorT_incapacidades: valorT_incapacidades,
                    valor_arl: valor_arl,
                    valor_eps: valor_eps,
                    valor_afp: valor_afp,
                    valor_total: valor_total,
                    fecha_liquidacion: fecha_liquidacion,
                    dias_liquidacion: dias_liquidacion,
                    cesantias: cesantias,
                    recibo: recibo
                }, {
                    where: { id_recibo: id_recibo }
                });
                if (editarRecibo) {
                    const reciboJ = JSON.stringify(editarRecibo);
                    logger_1.default.info('Estado: ' + 201);
                    logger_1.default.info('Recibo liquidacion editado: ' + reciboJ);
                    res.json({
                        message: 'Recibo liquidacion editado'
                    });
                }
            }
            catch (e) {
                logger_1.default.info('Estado: ' + 500);
                logger_1.default.info('Error editar Recibo liquidacion');
                res.status(500).json({
                    message: 'Error editar Recibo liquidacion'
                });
            }
        });
    }
}
const reciboController = new ReciboController();
exports.default = reciboController;
