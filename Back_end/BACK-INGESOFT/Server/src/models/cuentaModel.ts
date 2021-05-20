import Sequelize from 'sequelize';
import {sequelize} from '../database';

import bancos from "./bancoModel";

const cuentas = sequelize.define('cuentas',{
    id_cuenta:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_banco:Sequelize.INTEGER,
    numero_cuenta: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    tipo_cuenta: Sequelize.TEXT
},{timestamp: false});
bancos.hasMany(cuentas, {foreignKey:'id_banco'});
export default cuentas;