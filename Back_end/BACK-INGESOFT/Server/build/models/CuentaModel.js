"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const bancoModel_1 = __importDefault(require("./bancoModel"));
const cuentas = database_1.sequelize.define('cuentas', {
    id_cuenta: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_banco: sequelize_1.default.INTEGER,
    numero_cuenta: {
        type: sequelize_1.default.TEXT,
        allowNull: false,
        unique: true
    },
    tipo_cuenta: sequelize_1.default.TEXT
}, { timestamp: false });
bancoModel_1.default.hasMany(cuentas, { foreignKey: 'id_banco' });
exports.default = cuentas;
