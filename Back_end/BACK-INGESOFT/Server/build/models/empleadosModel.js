"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const areasModel_1 = __importDefault(require("./areasModel"));
const cargosModel_1 = __importDefault(require("./cargosModel"));
const contratosModel_1 = __importDefault(require("./contratosModel"));
const rolesModel_1 = __importDefault(require("./rolesModel"));
const horariosModel_1 = __importDefault(require("./horariosModel"));
const cuentaModel_1 = __importDefault(require("./cuentaModel"));
const empleados = database_1.sequelize.define('empleados', {
    id_empleado: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_rol: { type: sequelize_1.default.INTEGER },
    id_cuenta: { type: sequelize_1.default.INTEGER },
    id_contrato: { type: sequelize_1.default.INTEGER },
    id_area: { type: sequelize_1.default.INTEGER },
    id_cargo: { type: sequelize_1.default.INTEGER },
    id_horario: { type: sequelize_1.default.INTEGER },
    nombre: sequelize_1.default.TEXT,
    apellido: sequelize_1.default.TEXT,
    identificacion: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        unique: true
    },
    tipo_identificacion: sequelize_1.default.TEXT,
    contraseña: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    edad: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    direccion: sequelize_1.default.TEXT,
    telefono: sequelize_1.default.TEXT,
    foto: sequelize_1.default.TEXT,
    fecha_ingreso: {
        type: sequelize_1.default.DATE,
        allowNull: false
    },
    activo: sequelize_1.default.BOOLEAN,
    fecha_salida: {
        type: sequelize_1.default.DATE,
    },
    arl: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    eps: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    afp: {
        type: sequelize_1.default.TEXT,
        allowNull: false
    },
    certificadoArl: sequelize_1.default.TEXT,
    certificadoEps: sequelize_1.default.TEXT,
    certificadoAfp: sequelize_1.default.TEXT
}, { timestamp: false });
rolesModel_1.default.hasMany(empleados, { foreignKey: 'id_rol' });
cuentaModel_1.default.hasMany(empleados, { foreignKey: 'id_cuenta' });
contratosModel_1.default.hasMany(empleados, { foreignKey: 'id_contrato' });
areasModel_1.default.hasMany(empleados, { foreignKey: 'id_area' });
cargosModel_1.default.hasMany(empleados, { foreignKey: 'id_cargo' });
horariosModel_1.default.hasMany(empleados, { foreignKey: 'id_horario' });
exports.default = empleados;
