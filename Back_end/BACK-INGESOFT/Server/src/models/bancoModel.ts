import Sequelize from 'sequelize';
import {sequelize} from '../database';

const bancos = sequelize.define('bancos',{
    id_banco:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_banco: Sequelize.TEXT,
    nit_banco: Sequelize.TEXT
}, {timestamp: false});

export default bancos;