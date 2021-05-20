import {Request, Response} from 'express';

import logger from '../utils/logger';

import deduccionesModel from "../models/deduccionesModel";
import deduccionesRecibos from "../models/deduccionesRecibosModel";
import deducciones from "../models/deduccionesModel";
import empleados from "../models/empleadosModel";

class DeduccionesController{
    public async new_discount (req: Request, res: Response){
        const {identificacion, fecha, descripcion, valor} = req.body;

        const empleado= await empleados.findAll({where:{identificacion: identificacion},
            attributes: ['id_empleado']});

        const id_empleado= empleado[0].id_empleado

        try {
            let newtable = await deduccionesModel.create({
                id_empleado,
                fecha,
                descripcion,
                valor,
            }, {
                fields: ['id_empleado', 'fecha', 'descripcion', 'valor']
            });
            if (newtable) {
                const deduccion = JSON.stringify(newtable);
                logger.info('Estado: ' + 201);
                logger.info('Deduccion creada: ' + deduccion);
                res.json({
                    message: 'Deduccion agregada',
                });
            }
        } catch (error) {
            logger.info('Estado: ' + 500);
            logger.info('Error crear nueva deduccion');

            res.status(500).json({
                message: 'Error crear nueva deduccion'
            });
        }
    }

    public async asignation_deduccionesRecibos (req: Request, res: Response) {
        const {id_recibo, id_deduccion} = req.body;
        console.log(id_recibo,id_deduccion)
            try {
                let newtable = await deduccionesRecibos.create({
                    id_recibo,
                    id_deduccion
                },{
                    fields: ['id_recibo','id_deduccion']
                });
                if (newtable) {
                    res.json({
                        message: 'Asignacion realizada'
                    })
                }
            }catch (error) {
                console.log(error)
                res.json({
                    message:error
                })
            }


    }
    public async editar_deducciones  (req: Request, res: Response) {
        const{identificacion, id_deduccion}= req.body
        const empleado= await empleados.findAll({where:{identificacion: identificacion},
            attributes: ['id_empleado']});

        const id_empleado= empleado[0].id_empleado
        const deduccion = deducciones.findAll({where:{id_deduccion: id_deduccion}});
        const fecha = deduccion[0].fecha;
        const descripcion =deduccion[0].descripcion;

        try{
            let editarDeduccion = await deducciones.update({
                id_empleado,
                fecha,
                descripcion,
                valor:0
            },{
                where: {id_deduccion: id_deduccion}
            });
            if (editarDeduccion) {
                const deduccionJ = JSON.stringify(editarDeduccion);
                logger.info('Estado: ' + 201);
                logger.info('deduccion editada: ' + deduccionJ);

                res.json({
                    message: 'deduccion editada'
                });
            }
        }catch (e) {
            logger.info('Estado: ' + 500);
            logger.info('Error editar deduccion');

            res.status(500).json({
                message: 'Error editar deduccion'
            });
        }
    }

}
const deduccionesController= new DeduccionesController();
export default deduccionesController;