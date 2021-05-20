import Sequelize from 'sequelize';
import {sequelize} from '../database';

const horarios =sequelize.define('horarios',{
    id_horario:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo_horario: Sequelize.TEXT,
    hora_llegada: Sequelize.TIME,
    hora_salida: Sequelize.TIME
},{timestamp: false});

export default horarios;