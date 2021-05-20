import Sequelize from 'sequelize';
import {sequelize} from '../database';

const roles = sequelize.define('roles',{
    id_rol:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    tipo_rol: Sequelize.TEXT
},{timestamp: false});

export default roles;