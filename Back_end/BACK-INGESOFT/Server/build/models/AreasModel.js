"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const areas = database_1.sequelize.define('areas', {
    id_area: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    nombre_area: sequelize_1.default.TEXT,
    descripcion_area: sequelize_1.default.TEXT,
    responsable_area: sequelize_1.default.TEXT,
}, { timestamp: false });
exports.default = areas;
