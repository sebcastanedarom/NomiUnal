import Sequelize from 'sequelize';
import {sequelize} from '../database';

import areas from "./areasModel";
import cargos from "./cargosModel";

const areasCargos = sequelize.define('areasCargos', {
   id_area: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   id_cargo: {
       type: Sequelize.INTEGER,
   },
   salarioBase: {
     type: Sequelize.TEXT
   },
},{timestamp: false});

areas.hasMany(areasCargos,{foreignKey: 'id_area'});
cargos.hasMany(areasCargos, {foreignKey: 'id_cargo'});

export default areasCargos;