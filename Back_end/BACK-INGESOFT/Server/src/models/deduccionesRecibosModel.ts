import Sequelize from 'sequelize';
import {sequelize} from '../database';
import deducciones from "./deduccionesModel";
import recibos from "./recibosModel";

const deduccionesRecibos = sequelize.define('deduccionesrecibos',{
    id_recibo: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_deduccion:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
},{timestamp: false});

recibos.hasMany(deduccionesRecibos,{foreignKey:'id_recibo'});
deducciones.hasMany(deduccionesRecibos,{foreignKey:'id_deduccion'});
export default deduccionesRecibos;