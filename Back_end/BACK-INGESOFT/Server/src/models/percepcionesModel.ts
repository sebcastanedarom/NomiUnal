import Sequelize from 'sequelize';
import {sequelize} from '../database';

import recibos from "./recibosModel";

const percepciones = sequelize.define('percepciones',{
    id_percepcion:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_recibo: Sequelize.INTEGER,
    descripcion: Sequelize.TEXT,
    valor : Sequelize.FLOAT
},{timestamp: false});
recibos.hasMany(percepciones, {foreignKey: 'id_recibo'});

export default percepciones;