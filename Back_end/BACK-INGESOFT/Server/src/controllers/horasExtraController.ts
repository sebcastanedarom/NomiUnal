import {Request, Response} from 'express';

import logger from '../utils/logger';

import horasExtraModel from "../models/horasExtraModel";
import recibos from "../models/recibosModel";
import empleados from "../models/empleadosModel";

class HorasExtraController{
    public async new_extra_hours (req: Request, res: Response){
        const {identificacion, fecha, numero_horas} = req.body;

        const id_empleado = await empleados.findAll({where:{identificacion: identificacion},
            attributes: ['id_empleado']});

        const reciboActual= await recibos.findOne({where:{id_empleado: id_empleado[0].id_empleado},
            attributes: ['id_recibo']});

        const id_recibo=reciboActual.id_recibo;
        try {
            let newtable = await horasExtraModel.create({
                id_recibo,
                fecha,
                numero_horas
            }, {
                fields: ['id_recibo', 'fecha', 'numero_horas']
            });
            if (newtable) {
                const horasExtra = JSON.stringify(newtable);
                logger.info('Estado: ' + 201);
                logger.info('horas extra creadas: ' + horasExtra);


                res.json({
                    message: 'Horas extra agregadas',
                });
            }
        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error crear nuevas horas extra');

            res.status(500).json({
                message: 'Error crear nuevas horas extra'
            });
        }
    }

}
const horasExtraController = new HorasExtraController();
export default horasExtraController;