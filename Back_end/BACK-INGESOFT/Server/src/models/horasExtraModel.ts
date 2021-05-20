import Sequelize from 'sequelize';
import {sequelize} from '../database';

import recibos from "./recibosModel";

const horasExtra = sequelize.define('horasExtra',{
    id_horasExtra:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_recibo: Sequelize.INTEGER,
    numero_horas:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fecha: Sequelize.TIME
},{timestamp: false});
recibos.hasMany(horasExtra,{foreignKey:'id_recibo'});

export default horasExtra;