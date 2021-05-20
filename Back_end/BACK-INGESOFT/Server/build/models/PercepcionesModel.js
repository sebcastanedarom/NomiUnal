"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const recibosModel_1 = __importDefault(require("./recibosModel"));
const percepciones = database_1.sequelize.define('percepciones', {
    id_percepcion: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_recibo: sequelize_1.default.INTEGER,
    descripcion: sequelize_1.default.TEXT,
    valor: sequelize_1.default.FLOAT
}, { timestamp: false });
recibosModel_1.default.hasMany(percepciones, { foreignKey: 'id_recibo' });
exports.default = percepciones;
