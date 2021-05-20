import Sequelize from 'sequelize';
import {sequelize} from '../database';

import empleados from "./empleadosModel";

const incapacidades = sequelize.define('incapacidades',{
    id_incapacidad:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_empleado: Sequelize.INTEGER,
    tipo: Sequelize.TEXT,
    descripcion: Sequelize.TEXT,
    tiempo_incapacidad:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fecha_inicio :{
        type: Sequelize.DATE,
        allowNull: false
    },
    fecha_final :{
        type: Sequelize.DATE,
        allowNull: false
    }
},{timestamp: false});
empleados.hasMany(incapacidades,{foreignKey:'id_empleado'});

export default incapacidades;