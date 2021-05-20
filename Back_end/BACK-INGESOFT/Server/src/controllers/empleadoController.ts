import {Request, Response} from 'express';

import empleadosModel from '../models/empleadosModel';

import logger from '../utils/logger';
import areasModel from "../models/areasModel";
import cargosModel from "../models/cargosModel";
import tiposcontratosModel from "../models/tipoContratosModel";
import horariosModel from "../models/horariosModel";
import bancosModel from "../models/bancoModel";
import rolesModel from "../models/rolesModel";
import cuentasModel from "../models/cuentaModel";
import contratosModel from "../models/contratosModel"
import empleados from "../models/empleadosModel";

class EmpleadoController{
    public async get_employee_data(req: Request, res: Response) {
        try {
            const tipoContrato = await tiposcontratosModel.findAll();
            const area = await areasModel.findAll();
            const cargo = await cargosModel.findAll();
            const horario = await horariosModel.findAll();
            const banco = await bancosModel.findAll();
            const role = await rolesModel.findAll();

            logger.info('Estado: ' + 200);

            const tipoContratoL =JSON.stringify(tipoContrato);
            const cargosL = JSON.stringify(cargo);
            const areasL = JSON.stringify(area);
            const horariosL = JSON.stringify(horario);
            const bancosL = JSON.stringify(banco);
            const rolesL = JSON.stringify(role);

            logger.log({
                level: 'info',
                message:'Data encontrada: \nContratos: '+tipoContratoL+'\nCargos: '+cargosL+'\nAreas: '+areasL+
                    '\nHorarios: '+horariosL+'\nBancos: '+bancosL+'\nRoles: '+rolesL
            });

            res.status(200).json({tipoContrato,area,cargo,horario,banco,role});

        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error ');
            res.status(500).json({
                message: 'error'
            });
        }
    }
    public async new_employee(req: Request, res: Response) {
        const bcrypt = require('bcrypt');
        const {
            id_rol, id_cuenta, id_contrato, id_area, id_cargo, id_horario, nombre, apellido, identificacion, tipo_identificacion, edad, direccion,
            telefono, foto, fecha_ingreso, arl, eps, afp, certificadoArl, certificadoEps, certificadoAfp
        } = req.body
        try {
            let newtable = await empleadosModel.create({
                id_rol,
                id_cuenta,
                id_contrato,
                id_area,
                id_cargo,
                id_horario,
                nombre,
                apellido,
                identificacion,
                tipo_identificacion,
                contraseña: bcrypt.hashSync(id_rol + identificacion, 10),
                edad,
                direccion,
                telefono,
                foto,
                fecha_ingreso,
                activo: true,
                fecha_salida: null,
                arl,
                eps,
                afp,
                certificadoArl,
                certificadoEps,
                certificadoAfp
            }, {
                fields: ['id_rol', 'id_cuenta', 'id_contrato', 'id_area', 'id_cargo', 'id_horario', 'nombre',
                    'apellido', 'identificacion', 'tipo_identificacion', 'contraseña', 'edad', 'direccion', 'telefono', 'foto', 'fecha_ingreso', 'activo',
                    'fecha_salida', 'arl', 'eps', 'afp', 'certificadoArl', 'certificadoEps', 'certificadoAfp']
            });
            if (newtable) {
                const empleado = JSON.stringify(newtable);
                logger.info('Estado: ' + 201);
                logger.info('Empleado creado: ' + empleado);

                const empleado1 = await empleadosModel.findAll({where: {identificacion: identificacion}});

                res.json({
                    message: 'Empleado agregado',
                    id_empleado: empleado1[0].id_empleado
                });
            }
        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error crear nuevo empleado');

            res.status(500).json({
                message: 'error'
            });
        }

    }

    public async view_employee (req: Request, res: Response) {
        try {

            const empleado = await empleadosModel.findAll({
                where: {
                    activo: 1
                },
                attributes: ['nombre', 'apellido', 'identificacion', 'foto', 'id_area', 'id_cargo']
            });
            const cargos: any = [];
            const areas: any = [];

            for (let i = 0; i < empleado.length; i++) {

                areas.push(await areasModel.findAll({
                    where: {
                        id_area: empleado[i].id_area
                    },
                    attributes: ['nombre_area']
                }));

                cargos.push(await cargosModel.findAll({
                    where: {
                        id_cargo: empleado[i].id_cargo
                    },
                    attributes: ['nombre_cargo']
                }));
            }
            logger.info('Estado: ' + 200);

            logger.log({
                level: 'info',
                message:'Empleados encontrados exitosamente'
            });

            res.status(200).json({empleado, areas, cargos});

        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error encontrar empleados');
            res.status(500).json({
                message: 'error encontrar empleados'
            });
        }
    }
    public async employee_perfil (req: Request, res: Response){
        try {
            const empleado = await empleadosModel.findAll({where:{identificacion: req.params.id}});

            logger.info('Estado: ' + 200);

            logger.log({
                level: 'info',
                message:'Empleado encontrado exitosamente: '+empleado
            });

            res.status(200).json({empleado});

        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error encontrar empleado');
            res.status(500).json({
                message: 'error encontrar empleado'
            });
        }
    }
    public async employee_perfil_data (req: Request, res: Response){
        try {

            const empleado = await empleadosModel.findOne({where: {identificacion:req.params.id}});
            const cuenta = await cuentasModel.findOne({
                where : {id_cuenta:empleado.id_cuenta}
            })

            const contrato = await contratosModel.findOne({
                where :{
                    id_contrato: empleado.id_contrato
                }
            })





            let empleadoFornt = {
                nombre: empleado.nombre,
                tipo_identificacion: empleado.tipo_identificacion,
                celular: empleado.telefono,
                banco: cuenta.id_banco,
                arl: empleado.arl,
                eps: empleado.eps,
                afp: empleado.afp,
                apellido: empleado.apellido,
                identificacion: empleado.identificacion,
                direccion: empleado.direccion,
                foto: empleado.foto,
                numeroCuenta: cuenta.numero_cuenta,
                tipoCuenta: cuenta.tipo_cuenta,
                certificadoArl: empleado.certificadoAfp,
                certificadoEps: empleado.certificadoEps,
                certificadoAfp: empleado.certificadoAfp,
                area: empleado.id_area,
                cargo: empleado.id_cargo,
                horario: empleado.id_horario,
                tipoContrato: contrato.id_tipocontrato,
                contrato: contrato.contrato,
                rol: empleado.id_rol,
                // las siguientes son para el manejo de id al modificar las cuentas no hacen parte del modelo en el front
                id_cuenta: empleado.id_cuenta,
                id_contrato: empleado.id_contrato,
                id_empleado: empleado.id_empleado,
            }


            logger.info('Estado: ' + 200);



            logger.log({
                level: 'info',
                message:'Data perfil encontrada:\nempleado: '+empleadoFornt
            });

            res.status(200).json(empleadoFornt);

        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error encontrar data empleado');
            res.status(500).json({
                message: 'error encontrar data empleado'
            });
        }
    }



    public async edit_employee (req: Request, res: Response) {
        const { id_empleado, id_rol,id_area, id_cargo, id_horario, nombre,
            apellido, identificacion, tipo_identificacion,direccion, telefono, foto,
            arl, eps, afp, certificadoArl, certificadoEps, certificadoAfp
        } = req.body
        try {
            let editTable = await empleadosModel.update(
                {
                    id_rol: id_rol,
                    id_area: id_area,
                    id_cargo: id_cargo,
                    id_horario: id_horario,
                    nombre: nombre,
                    apellido: apellido,
                    identificacion: identificacion,
                    tipo_identificacion: tipo_identificacion,
                    direccion: direccion,
                    telefono: telefono,
                    foto: foto,
                    arl: arl,
                    eps: eps,
                    afp: afp,
                    certificadoArl: certificadoArl,
                    certificadoEps: certificadoEps,
                    certificadoAfp: certificadoAfp
                },
                {
                    where: {id_empleado: id_empleado}
                });
            if (editTable) {
                const empleado = JSON.stringify(editTable);
                logger.info('Estado: ' + 201);
                logger.info('Empleado editado: ' + empleado);

                res.json({
                    message: 'Empleado editado'
                });
            }
        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error editar empleado');

            res.status(500).json({
                message: 'Error editar empleado'
            });
        }
    }

    public async despedir(req: Request, res: Response){
        const { identificacion, fecha_salida} = req.body

        const empleado = await empleados.findAll({
            where: {identificacion: identificacion},
            attributes:['id_empleado']
        })
        const id_empleado= empleado[0].id_empleado

        try {
            let editTable = await empleadosModel.update(
                {
                    activo: false,
                    fecha_salida: fecha_salida
                },
                {
                    where: {id_empleado: id_empleado}
                });
            if (editTable) {
                const empleadoJ = JSON.stringify(editTable);
                logger.info('Estado: ' + 201);
                logger.info('Empleado despedido: ' + empleadoJ);

                res.json({
                    message: 'Empleado despedido'
                });
            }
        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error despedir empleado');

            res.status(500).json({
                message: 'Error despedir empleado'
            });
        }
    }
}

const empleadoController = new EmpleadoController();
export default empleadoController;