"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const horarios = database_1.sequelize.define('horarios', {
    id_horario: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo_horario: sequelize_1.default.TEXT,
    hora_llegada: sequelize_1.default.TIME,
    hora_salida: sequelize_1.default.TIME
}, { timestamp: false });
exports.default = horarios;
