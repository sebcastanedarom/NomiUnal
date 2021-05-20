import Sequelize from 'sequelize';
import {sequelize} from '../database';

import tiposcontratos from "./tipoContratosModel";

const contratos = sequelize.define('contratos',{
    id_contrato:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_tipocontrato:{
        type:Sequelize.INTEGER
    },
    fecha_ini:{
        type: Sequelize.DATE,

    },
    fecha_fin:{
        type: Sequelize.DATE,
    },
    contrato: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
},{timestamp: false});
tiposcontratos.hasMany(contratos,{foreignKey: 'id_tipocontrato'});

export default contratos;