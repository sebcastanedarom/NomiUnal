"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const recibosModel_1 = __importDefault(require("./recibosModel"));
const horasExtra = database_1.sequelize.define('horasExtra', {
    id_horasExtra: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_recibo: sequelize_1.default.INTEGER,
    numero_horas: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    fecha: sequelize_1.default.TIME
}, { timestamp: false });
recibosModel_1.default.hasMany(horasExtra, { foreignKey: 'id_recibo' });
exports.default = horasExtra;
