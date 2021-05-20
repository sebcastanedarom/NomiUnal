import Sequelize from 'sequelize';
import {sequelize} from '../database';

import empleados from "./empleadosModel";

const deducciones = sequelize.define('deducciones',{
    id_deduccion:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_empleado: Sequelize.INTEGER,
    fecha: Sequelize.DATE,
    descripcion: Sequelize.TEXT,
    valor : Sequelize.FLOAT
},{timestamp: false});
empleados.hasMany(deducciones,{foreignKey: 'id_empleado'});

export default deducciones;