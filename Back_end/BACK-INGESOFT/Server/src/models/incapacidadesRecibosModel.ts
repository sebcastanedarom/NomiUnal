import Sequelize from 'sequelize';
import {sequelize} from '../database';

import recibos from "./recibosModel";
import incapacidades from "./incapacidadesModel";


const incapacidadesRecibos = sequelize.define('incapacidadesrecibos',{
    id_recibo: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_incapacidad:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
},{timestamp: false});
recibos.hasMany(incapacidadesRecibos,{foreignKey:'id_recibo'});
incapacidades.hasMany(incapacidadesRecibos,{foreignKey:'id_incapacidad'});

export default incapacidadesRecibos;
