import {Request, Response} from 'express';

import empleadosModel from '../models/empleadosModel';

import logger from '../utils/logger';

const jwt = require("jsonwebtoken");

class LoginController{
    public async login(req: Request, res: Response) {
        const bcrypt = require('bcrypt');
        const {nombre, contraseña} = req.body;
        try {
            const empleado = await empleadosModel.findAll({
                where: {
                    nombre: nombre,
                },
                attributes: ['id_empleado', 'contraseña']
            })


            const match =  bcrypt.compareSync(contraseña.toString(), empleado[0].contraseña);
            if(match) {

                const idEmpleado = empleado[0].id_empleado;
                const token = jwt.sign({id: idEmpleado}, "secretkey");

                const tokenL = JSON.stringify(token);
                      logger.info('Estato: 200');
                logger.info('Empleado encontrado: ' + tokenL);
                return res.status(200).json({token});
            }else{
                return  res.status(500).json('datos incorrectos')
            }

        } catch (error) {
            console.log(error)
            logger.info('Contraseña no encontrada');
            return res.status(401).send("Contraseña incorrecta")

        }

    }

}

const loginController = new LoginController();
export default loginController;