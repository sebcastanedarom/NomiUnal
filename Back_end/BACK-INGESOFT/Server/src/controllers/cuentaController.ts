import {Request, Response} from 'express';

import cuentaModel from '../models/cuentaModel';

import logger from '../utils/logger';

class CuentaController {

    public async new_account(req: Request, res: Response) {
        const {id_banco, numero_cuenta, tipo_cuenta} = req.body
        try {
            let newtable = await cuentaModel.create({
                id_banco,
                numero_cuenta,
                tipo_cuenta
            }, {
                fields: ['id_banco', 'numero_cuenta', 'tipo_cuenta']
            });
            if (newtable) {
                const cuentaL = JSON.stringify(newtable);
                logger.info('Estado: ' + 201);
                logger.info('Cuenta creado: ' + cuentaL);

                const cuenta1 = await cuentaModel.findAll({where:{numero_cuenta: numero_cuenta}})

                res.json({
                    message: 'cuenta agregada',
                    id_cuenta: cuenta1[0].id_cuenta
                });
            }
        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error crear nueva cuenta');

            res.status(500).json({
                message: 'error'
            });
        }

    };
    public async edit_account (req: Request, res: Response){
        const {id_cuenta, id_banco, numero_cuenta, tipo_cuenta} = req.body
        try {
            let editTable = await cuentaModel.update(
                {
                    id_banco: id_banco,
                    numero_cuenta: numero_cuenta,
                    tipo_cuenta: tipo_cuenta
                },
                {
                    where:{id_cuenta:id_cuenta}
                });
            if (editTable) {
                const cuentaL = JSON.stringify(editTable);
                logger.info('Estado: ' + 201);
                logger.info('Cuenta editada: ' + cuentaL);

                res.json({
                    message: 'cuenta editada',
                });
            }
        } catch (error) {
            logger.info('Estado: ' + 500);
            logger.info('Error editar cuenta');

            res.status(500).json({
                message: 'Error editar cuenta'
            });
        }
    };
};

const cuentaController = new CuentaController();
export default cuentaController;