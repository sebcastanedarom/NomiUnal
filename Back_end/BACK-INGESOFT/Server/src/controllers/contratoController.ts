import {Request, Response} from 'express';

import contratoModel from '../models/contratosModel';

import logger from '../utils/logger';

class ContratoController{
    public async new_contract(req: Request, res: Response) {
        const {id_tipocontrato, fecha_ini, fecha_fin, contrato} = req.body
        try {
            let newtable = await contratoModel.create({
                id_tipocontrato,
                fecha_ini,
                fecha_fin,
                contrato
            }, {
                fields: ['id_tipocontrato', 'fecha_ini', 'fecha_fin', 'contrato']
            });
            if (newtable) {

                const contratoL = JSON.stringify(newtable);
                logger.info('Estado: ' + 201);
                logger.info('Contrato creado: ' + contratoL);

                const contrato1 = await contratoModel.findAll({where:{contrato: contrato}});

                res.status(201).json({
                    message: 'contrato agregado',
                    id_contrato: contrato1[0].id_contrato
                });
            }
        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error crear nuevo contrato');

            res.status(500).json({
                message: 'error'
            });
        }

    }
    public async edit_contract (req: Request, res: Response){
        const {id_contrato, id_tipocontrato, contrato} = req.body
        try {
             let editTable = await contratoModel.update(
                 {
                     id_tipocontrato: id_tipocontrato,
                     contrato: contrato
                 },
                 {
                  where: {id_contrato: id_contrato }
                 }
             )

                const contratoL = JSON.stringify(editTable);
                logger.info('Estado: ' + 201);
                logger.info('Contrato editado: ');

                res.status(201).json({
                    message: 'contrato editado: '+contratoL,
                });

        } catch (error) {
            logger.info('Estado: ' + 500);
            logger.info('Error editar contrato');

            res.status(500).json({
                message: 'error editar contrato'
            });
        }

    }
}

const contratoController = new ContratoController();
export default contratoController;