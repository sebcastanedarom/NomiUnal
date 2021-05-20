import Sequelize from 'sequelize';
import {sequelize} from '../database';

const areas = sequelize.define('areas',{
    id_area:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    nombre_area: Sequelize.TEXT,
    descripcion_area: Sequelize.TEXT,
    responsable_area: Sequelize.TEXT,
},{timestamp: false});

export default areas;