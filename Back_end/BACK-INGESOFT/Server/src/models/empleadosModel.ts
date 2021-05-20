import Sequelize from 'sequelize';
import {sequelize} from '../database';


import areas from './areasModel';
import cargos from './cargosModel';
import contratos from "./contratosModel";
import roles from "./rolesModel";
import horarios from "./horariosModel";
import cuentas from "./cuentaModel";

const empleados = sequelize.define('empleados',{
    id_empleado:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_rol:{type:Sequelize.INTEGER},
    id_cuenta:{type:Sequelize.INTEGER},
    id_contrato:{type:Sequelize.INTEGER},
    id_area:{type:Sequelize.INTEGER},
    id_cargo:{type:Sequelize.INTEGER},
    id_horario:{type:Sequelize.INTEGER},
    nombre: Sequelize.TEXT,
    apellido: Sequelize.TEXT,
    identificacion:{
        type:Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    tipo_identificacion: Sequelize.TEXT,
    contraseña: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    edad:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    direccion: Sequelize.TEXT,
    telefono: Sequelize.TEXT,
    foto: Sequelize.TEXT,
    fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false
    },
    activo: Sequelize.BOOLEAN,
    fecha_salida: {
        type: Sequelize.DATE,
    },
    arl: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    eps: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    afp:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    certificadoArl: Sequelize.TEXT,
    certificadoEps: Sequelize.TEXT,
    certificadoAfp: Sequelize.TEXT
},{timestamp: false});
roles.hasMany(empleados, {foreignKey: 'id_rol'});
cuentas.hasMany(empleados,{foreignKey:'id_cuenta'});
contratos.hasMany(empleados, {foreignKey: 'id_contrato'});
areas.hasMany(empleados, {foreignKey: 'id_area'});
cargos.hasMany(empleados, {foreignKey: 'id_cargo'});
horarios.hasMany(empleados,{foreignKey:'id_horario'});

export default empleados;