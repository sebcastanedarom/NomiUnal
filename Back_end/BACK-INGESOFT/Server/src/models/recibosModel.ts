import Sequelize from 'sequelize';
import {sequelize} from '../database';

import empleados from "./empleadosModel";

const recibos = sequelize.define('recibos',{
    id_recibo:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_empleado:Sequelize.INTEGER,
    tipo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    tiempo_trabajado: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    salario: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    cantidad_horas_extra: {
        type: Sequelize.INTEGER
    },
    valorT_horas_extra: {
        type: Sequelize.DOUBLE
    },
    valorT_deducciones:{
        type: Sequelize.INTEGER
    },
    valorT_percepciones: {
        type: Sequelize.INTEGER
    },
    valorT_incapacidades: {
        type: Sequelize.INTEGER
    },
    valor_arl:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor_eps:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor_afp:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor_total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    fecha_liquidacion: {
        type: Sequelize.DATE,
    },
    dias_liquidacion: {
        type: Sequelize.INTEGER,

    },
    cesantias: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recibo: {
        type: Sequelize.TEXT,
    },
},{timestamp: false});

empleados.hasMany(recibos, {foreingKey:'id_empleado'});

export default recibos;