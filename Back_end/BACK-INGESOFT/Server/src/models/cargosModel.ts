import Sequelize from 'sequelize';
import {sequelize} from '../database';

const cargos = sequelize.define('cargos',{
    id_cargo:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_cargo: Sequelize.TEXT,
    descripcion_cargo: Sequelize.TEXT

},{timestamp: false});

export default cargos;