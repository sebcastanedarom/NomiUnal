"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const recibosModel_1 = __importDefault(require("./recibosModel"));
const incapacidadesModel_1 = __importDefault(require("./incapacidadesModel"));
const incapacidadesRecibos = database_1.sequelize.define('incapacidadesrecibos', {
    id_recibo: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    id_incapacidad: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
}, { timestamp: false });
recibosModel_1.default.hasMany(incapacidadesRecibos, { foreignKey: 'id_recibo' });
incapacidadesModel_1.default.hasMany(incapacidadesRecibos, { foreignKey: 'id_incapacidad' });
exports.default = incapacidadesRecibos;
