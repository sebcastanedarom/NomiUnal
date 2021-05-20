"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const empleadosModel_1 = __importDefault(require("./empleadosModel"));
const recibos = database_1.sequelize.define('recibos', {
    id_recibo: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_empleado: sequelize_1.default.INTEGER,
    tipo: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.default.DATE,
        allowNull: false
    },
    tiempo_trabajado: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    salario: {
        type: sequelize_1.default.DOUBLE,
        allowNull: false,
    },
    cantidad_horas_extra: {
        type: sequelize_1.default.INTEGER
    },
    valorT_horas_extra: {
        type: sequelize_1.default.DOUBLE
    },
    valorT_deducciones: {
        type: sequelize_1.default.INTEGER
    },
    valorT_percepciones: {
        type: sequelize_1.default.INTEGER
    },
    valorT_incapacidades: {
        type: sequelize_1.default.INTEGER
    },
    valor_arl: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    valor_eps: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    valor_afp: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    valor_total: {
        type: sequelize_1.default.DOUBLE,
        allowNull: false
    },
    fecha_liquidacion: {
        type: sequelize_1.default.DATE,
    },
    dias_liquidacion: {
        type: sequelize_1.default.INTEGER,
    },
    cesantias: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    recibo: {
        type: sequelize_1.default.TEXT,
    },
}, { timestamp: false });
empleadosModel_1.default.hasMany(recibos, { foreingKey: 'id_empleado' });
exports.default = recibos;
