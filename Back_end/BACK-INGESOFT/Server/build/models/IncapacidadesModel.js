"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const empleadosModel_1 = __importDefault(require("./empleadosModel"));
const incapacidades = database_1.sequelize.define('incapacidades', {
    id_incapacidad: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_empleado: sequelize_1.default.INTEGER,
    tipo: sequelize_1.default.TEXT,
    descripcion: sequelize_1.default.TEXT,
    tiempo_incapacidad: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    fecha_inicio: {
        type: sequelize_1.default.DATE,
        allowNull: false
    },
    fecha_final: {
        type: sequelize_1.default.DATE,
        allowNull: false
    }
}, { timestamp: false });
empleadosModel_1.default.hasMany(incapacidades, { foreignKey: 'id_empleado' });
exports.default = incapacidades;
