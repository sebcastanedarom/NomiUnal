import {Request, Response} from 'express';

import logger from '../utils/logger';

import percepcionesModel from "../models/percepcionesModel";
import recibos from "../models/recibosModel";
import empleados from "../models/empleadosModel";

class PercepcionesController{
    public async new_perception (req: Request, res: Response){
        const {identificacion, descripcion, valor} = req.body;

        const id_empleado = empleados.findAll({where:{identificacion: identificacion},
            attributes: ['id_empleado']});

        const reciboActual= recibos.findOne({where:{id_empleado: id_empleado[0].id_empleado},
            attributes: ['id_recibo']});

        const id_recibo=reciboActual.id_recibo;

        try {
            let newtable = await percepcionesModel.create({
                id_recibo,
                descripcion,
                valor
            }, {
                fields: ['id_recibo', 'descripcion', 'valor']
            });
            if (newtable) {
                const percepcion = JSON.stringify(newtable);
                logger.info('Estado: ' + 201);
                logger.info('Percepcioncreada: ' + percepcion);


                res.json({
                    message: 'Percepcion agregada',
                });
            }
        } catch (error) {
            logger.info('Estado: ' + 500);
            logger.info('Error crear nueva percepcion');

            res.status(500).json({
                message: 'Error crear nueva percepcion'
            });
        }
    }

}
const percepcionesController = new PercepcionesController ();
export default percepcionesController;
