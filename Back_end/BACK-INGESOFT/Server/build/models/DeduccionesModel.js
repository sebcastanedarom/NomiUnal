"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const empleadosModel_1 = __importDefault(require("./empleadosModel"));
const deducciones = database_1.sequelize.define('deducciones', {
    id_deduccion: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_empleado: sequelize_1.default.INTEGER,
    fecha: sequelize_1.default.DATE,
    descripcion: sequelize_1.default.TEXT,
    valor: sequelize_1.default.FLOAT
}, { timestamp: false });
empleadosModel_1.default.hasMany(deducciones, { foreignKey: 'id_empleado' });
exports.default = deducciones;
