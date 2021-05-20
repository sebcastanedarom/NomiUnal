import Sequelize from 'sequelize';
import {sequelize} from '../database';

const tiposcontratos = sequelize.define('tiposcontratos',{
    id_tipo:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: Sequelize.TEXT,


},{timestamp: false});

export default tiposcontratos;