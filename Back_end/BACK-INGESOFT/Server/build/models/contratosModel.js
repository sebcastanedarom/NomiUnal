"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const tipoContratosModel_1 = __importDefault(require("./tipoContratosModel"));
const contratos = database_1.sequelize.define('contratos', {
    id_contrato: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_tipocontrato: {
        type: sequelize_1.default.INTEGER
    },
    fecha_ini: {
        type: sequelize_1.default.DATE,
    },
    fecha_fin: {
        type: sequelize_1.default.DATE,
    },
    contrato: {
        type: sequelize_1.default.TEXT,
        allowNull: false,
        unique: true
    },
}, { timestamp: false });
tipoContratosModel_1.default.hasMany(contratos, { foreignKey: 'id_tipocontrato' });
exports.default = contratos;
