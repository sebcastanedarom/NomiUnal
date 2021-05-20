"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const roles = database_1.sequelize.define('roles', {
    id_rol: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true
    },
    tipo_rol: sequelize_1.default.TEXT
}, { timestamp: false });
exports.default = roles;
