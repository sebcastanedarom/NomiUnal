"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const areasModel_1 = __importDefault(require("./areasModel"));
const cargosModel_1 = __importDefault(require("./cargosModel"));
const areasCargos = database_1.sequelize.define('areasCargos', {
    id_area: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cargo: {
        type: sequelize_1.default.INTEGER,
    },
    salarioBase: {
        type: sequelize_1.default.TEXT
    },
}, { timestamp: false });
areasModel_1.default.hasMany(areasCargos, { foreignKey: 'id_area' });
cargosModel_1.default.hasMany(areasCargos, { foreignKey: 'id_cargo' });
exports.default = areasCargos;
