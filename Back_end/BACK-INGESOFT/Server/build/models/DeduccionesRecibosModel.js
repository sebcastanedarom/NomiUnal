"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const deduccionesModel_1 = __importDefault(require("./deduccionesModel"));
const recibosModel_1 = __importDefault(require("./recibosModel"));
const deduccionesRecibos = database_1.sequelize.define('deduccionesrecibos', {
    id_recibo: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    id_deduccion: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
}, { timestamp: false });
recibosModel_1.default.hasMany(deduccionesRecibos, { foreignKey: 'id_recibo' });
deduccionesModel_1.default.hasMany(deduccionesRecibos, { foreignKey: 'id_deduccion' });
exports.default = deduccionesRecibos;
