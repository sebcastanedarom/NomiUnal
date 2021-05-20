import {Request, Response} from 'express';

import AbstractFactory from "../Objects/abstractFactory";
import Producer from '../Objects/Producer';

import empleadosModel from '../models/empleadosModel';
import logger from "../utils/logger";
import incapacidadesRecibos from "../models/incapacidadesRecibosModel";

class IncapacidadesController {
    public async new_absence(req: Request, res: Response) {
        const {identificacion, tipo, descripcion, tiempo_incapacidad, fecha_inicio, fecha_final} = req.body;

        const empleado = await empleadosModel.findAll({
            where: {
                identificacion: identificacion
            },
            attributes: ['id_empleado']
        });

        const idEmpleado = empleado[0].id_empleado;

        const licenciaData = {idEmpleado, tipo, descripcion, tiempo_incapacidad, fecha_inicio, fecha_final};

        const incapacidades: AbstractFactory = Producer.getAbstractFactoryRecibos();

        const incapacidad = incapacidades.createIncapacidad();

        const flag = await incapacidad.createIncapacidad(licenciaData);

        if (flag) {
            const incapacidadJ = JSON.stringify(licenciaData);
            logger.info('Estado: ' + 201);
            logger.info(tipo + ' creada: ' + incapacidadJ);
            res.json({
                message: 'Incapacidad creada exitosamente',
            });
        } else {
            logger.info('Estado: ' + 201);
            logger.info('Error crear nueva ' + tipo);
            res.status(500).json({
                message: 'error al crear Incapacidad'
            });
        }

    }

    public async asignation_incapacidadesRecibos(req: Request, res: Response) {
        const {id_recibo, id_incapacidad} = req.body;

        try {
            let newtable = await incapacidadesRecibos.create({
                id_recibo,
                id_incapacidad
            }, {
                fields: ['id_recibo', 'id_incapacidad']
            });
            if (newtable) {
                res.json({
                    message: 'Asignacion realizada'
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                message: error
            })
        }
    }
}



const incapacidadController = new IncapacidadesController();

export default incapacidadController;