"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const cargos = database_1.sequelize.define('cargos', {
    id_cargo: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    nombre_cargo: sequelize_1.default.TEXT,
    descripcion_cargo: sequelize_1.default.TEXT
}, { timestamp: false });
exports.default = cargos;
