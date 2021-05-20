"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const bancos = database_1.sequelize.define('bancos', {
    id_banco: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_banco: sequelize_1.default.TEXT,
    nit_banco: sequelize_1.default.TEXT
}, { timestamp: false });
exports.default = bancos;
