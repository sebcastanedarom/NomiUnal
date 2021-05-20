import {Request, Response} from 'express';

import reciboModel from '../models/recibosModel';

import logger from '../utils/logger';
import AbstractFactory from "../Objects/abstractFactory";
import RecibosProducer from "../Objects/Producer";
import recibos from "../models/recibosModel";
import empleados from "../models/empleadosModel";
import empleadosModel from "../models/empleadosModel";
import areasModel from "../models/areasModel";
import cargosModel from "../models/cargosModel";
import contratos from "../models/contratosModel";
import tiposcontratos from "../models/tipoContratosModel";
import Sequelize from "sequelize";

class ReciboController{
    public async new_receipt(req: Request, res: Response) {
        const {id_empleado, fecha} = req.body;

        const recibo: AbstractFactory = RecibosProducer.getAbstractFactoryRecibos();

        const reciboMes = recibo.createRecibo("Recibo mes");
        const flag = await reciboMes.createRecibo(id_empleado, fecha);

        if (flag){
             res.json({
                 message: 'Recibos creado exitosamente',
             });
        }else{
             res.status(500).json({
                 message: 'error'
             });
        }
    }
    public async view_recibes (req: Request, res: Response){
        try {
            console.log(req.params.id)
            const empleado = await empleados.findAll({where:{identificacion: req.params.id},
                attributes: ['id_empleado', 'nombre', 'apellido', 'identificacion', 'id_area', 'id_cargo']});

            const areas =await areasModel.findAll({where:{id_area: empleado[0].id_area},
                attributes:['nombre_area']})
            const area = areas[0].nombre_area

            const cargos =await cargosModel.findAll({where:{id_cargo: empleado[0].id_cargo},
                attributes:['nombre_cargo']})
            const cargo = cargos[0].nombre_cargo

            const recibo = await reciboModel.findAll({
                where:{
                    id_empleado: empleado[0].id_empleado
                },
                attributes:['id_recibo', 'valor_total', 'fecha']});

            logger.info('Estado: ' + 200);

            logger.log({
                level: 'info',
                message:'Recibos encontrados exitosamente: '+recibo
            });

            res.status(200).json({recibo, empleado, area, cargo});

        } catch (e) {
            console.log(e)
            logger.info('Estado: ' + 500);
            logger.info('Error encontrar recibos');
            res.status(500).json({
                message: 'error encontrar recibos'
            });
        }
    }
    public async view_recibe_employee (req: Request, res: Response){
        try {

            const {identificacion, id_recibo}= req.body

            const empleado = empleados.findAll({where:{identificacion: identificacion},
                attributes: ['id_empleado', 'nombre', 'apellido', 'identificacion', 'id_area', 'id_cargo']});

            const areas =await areasModel.findAll({where:{id_area: empleado[0].id_area},
                attributes:['nombre_area']})
            const area = areas[0].nombre_area

            const cargos =await areasModel.findAll({where:{id_cargo: empleado[0].id_cargo},
                attributes:['nombre_cargo']})
            const cargo = cargos[0].nombre_cargo

            const recibo = await reciboModel.findAll({
                where:{
                    id_empleado: empleado[0].id_empleado,
                    id_recibo: id_recibo
                }})

            logger.info('Estado: ' + 200);

            logger.log({
                level: 'info',
                message:'Recibos seleccionado encontrado exitosamente: '+recibo
            });

            res.status(200).json({recibo, empleado, cargo, area});

        } catch (e) {
            console.log(e)
            logger.info('Estado: ' + 500);
            logger.info('Error encontrar recibo de empleado');
            res.status(500).json({
                message: 'error encontrar recibo de empleado'
            });
        }
    }
    public async editar_recibo (req: Request, res: Response) {
        const {identificacion,fecha, tiempo_trabajado, salario, cantidad_horas_extra, valorT_horas_extra,
            valorT_deducciones, valorT_percepciones, valorT_incapacidades, valor_arl, valor_eps,
            valor_afp, valor_total, recibo} = req.body;

        const empleado = await empleados.findOne({where:{identificacion: identificacion},
            attributes: ['id_empleado']});
        console.log(empleado.id_empleado)
        const id_empleado = empleado.id_empleado;

        const reciboActual= await recibos.findOne({where:{id_empleado: id_empleado},
            attributes: ['id_recibo']});
        const id_recibo=reciboActual.id_recibo;

        console.log(id_recibo)

        try {
            //let recibop = await  recibos.findOne({where:{id_recibo: id_recibo}});
           // console.log(recibop)


            let editarRecibo = await recibos.update(
                {
                id_empleado:id_empleado,
                fecha:fecha,
                tiempo_trabajado:tiempo_trabajado,
                salario:salario,
                cantidad_horas_extra:cantidad_horas_extra,
                valorT_horas_extra:valorT_horas_extra,
                valorT_deducciones:valorT_deducciones,
                valorT_percepciones:valorT_percepciones,
                valorT_incapacidades:valorT_incapacidades,
                valor_arl:valor_arl,
                valor_eps:valor_eps,
                valor_afp:valor_afp,
                valor_total:valor_total,
                fecha_liquidacion: null,
                dias_liquidacion: null,
                cesantias: 0,
                recibo:recibo
            },
                {
                where: {id_recibo: id_recibo}
            });
            if (editarRecibo) {
                const reciboj = JSON.stringify(editarRecibo);
                logger.info('Estado: ' + 201);
                logger.info('Recibos editado: ' + reciboj);

                res.json({
                    message: 'Recibos editado'
                });
            }
        }catch (e) {
            console.log(e)
            logger.info('Estado: ' + 500);
            logger.info('Error editar Recibos');

            res.status(500).json({
                message: 'Error editar Recibos'
            });
        }
    }

    public async pagoRecibo(req: Request, res: Response){
        try {
            const {identificacion} = req.body;

            const empleado =  await empleados.findAll({where:{identificacion: identificacion},
                attributes: ['id_empleado', 'id_contrato', 'nombre', 'apellido', 'identificacion', 'id_area', 'id_cargo']})

            const areas =await areasModel.findAll({where:{id_area: empleado[0].id_area},
                attributes:['nombre_area']})
            const area = areas[0].nombre_area

            const cargos =await cargosModel.findAll({where:{id_cargo: empleado[0].id_cargo},
                attributes:['nombre_cargo']})
            const cargo = cargos[0].nombre_cargo

            const contrato = await contratos.findAll({where:{id_contrato: empleado[0].id_contrato},
                attributes:['id_tipocontrato']});

            const tipoContrato = await tiposcontratos.findAll({where:{id_tipo: contrato[0].id_tipocontrato},
                attributes: ['descripcion']})

            var tipo="Pago Normal"
            if(tipoContrato[0].descripcion == ("Contratista")){
                tipo="Pago Contratista"
            }
            const recibo: AbstractFactory =  RecibosProducer.getAbstractFactoryRecibos();
            const reciboPago = recibo.executePago(tipo);

            logger.info('Estado: ' + 200);

            logger.log({
                level: 'info',
                message:'Recibos de pago'
            });

            const info=await reciboPago.appyPago(identificacion)

            res.status(200).json({empleado, area, cargo, info});

        }catch (e) {

            logger.info('Estado: ' + 500);

            logger.log({
                level: 'info',
                message:'Error Informacion pago recibo'
            });

            res.status(500).json({
                message: 'Error Informacion pago recibo'
            });
        }

    }


    public async view_all_recibe (req: Request, res: Response) {
        try {
            const empleado = await empleadosModel.findAll({
                attributes: ['id_empleado', 'activo','nombre', 'apellido', 'identificacion', 'foto', 'id_area', 'id_cargo']
            });

            const recibo: any =[];
            const {Op} =   Sequelize;

            for (let i = 0; i < empleado.length; i++){
                recibo.push(await recibos.findAll({
                    where: {
                        id_empleado: empleado[i].id_empleado,
                        valor_total:{[Op.gt]: 0}
                    },
                    attributes: ['id_recibo', 'valor_total', 'fecha']}))
            }
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
                message:'Recibos de todos los empleados'
            });
            res.status(200).json({recibo, empleado, areas, cargos});

        } catch (e) {
            logger.info('Estado: ' + 500);

            logger.log({
                level: 'info',
                message:'Error Todos los recibos de pago'
            });

            res.status(500).json({
                message: 'Error Todos los recibos de pago'
            });
        }
    }

    public async pagarLiquidacion (req: Request, res: Response){
        try {
            const {identificacion} = req.body;
            console.log(identificacion);
            const empleado = await empleados.findAll({
                where: {identificacion: identificacion},
                attributes: ['id_empleado', 'id_contrato', 'nombre', 'apellido', 'identificacion',
                    'id_area', 'id_cargo','fecha_ingreso']
            })

            const areas = await areasModel.findAll({
                where: {id_area: empleado[0].id_area},
                attributes: ['nombre_area']
            })
            const area = areas[0].nombre_area

            const cargos = await areasModel.findAll({
                where: {id_cargo: empleado[0].id_cargo},
                attributes: ['nombre_cargo']
            })
            const cargo = cargos[0].nombre_cargo

            const contrato = await contratos.findAll({
                where: {id_contrato: empleado[0].id_contrato},
                attributes: ['id_tipocontrato']
            });

            const tipoContrato = await tiposcontratos.findAll({
                where: {id_tipo: contrato[0].id_tipocontrato},
                attributes: ['descripcion']
            })

            var tipo = "Pago Normal"
            if (tipoContrato[0].descripcion == ("Contratista")) {
                tipo = "Pago Contratista"
            }
            const recibo: AbstractFactory =  RecibosProducer.getAbstractFactoryRecibos();
            const reciboPago = recibo.executePago(tipo);

            const info = await reciboPago.appyPago(identificacion)

            const cesantias = info.salario;

            const valorTotalLiq= info.salarioF+cesantias;

            logger.info('Estado: ' + 200);

            logger.log({
                level: 'info',
                message:'Recibos de pago liquidacion'
            });

            res.status(200).json({empleado, area, cargo, info, cesantias, valorTotalLiq});

        }catch (e) {

            logger.info('Estado: ' + 500);

            logger.log({
                level: 'info',
                message:'Error Informacion pago recibo liquidacion'
            });

            res.status(500).json({
                message: 'Error Informacion pago recibo liquidacion'
            });
        }
    }

    public async editar_liquidacion (req: Request, res: Response) {
        const {identificacion, fecha, tiempo_trabajado, salario, cantidad_horas_extra, valorT_horas_extra,
            valorT_deducciones, valorT_percepciones, valorT_incapacidades, valor_arl, valor_eps,
            valor_afp, valor_total, fecha_liquidacion, dias_liquidacion, cesantias,  recibo} = req.body;

        const id_empleado = empleados.findAll({where:{identificacion: identificacion},
            attributes: ['id_empleado']});

        const reciboActual= recibos.findOne({where:{id_empleado: id_empleado[0].id_empleado},
            attributes: ['id_recibo']});

        const id_recibo=reciboActual.id_recibo;

        try {
            let editarRecibo = await recibos.update({
                id_empleado:id_empleado,
                tipo:"Liquidacion",
                fecha:fecha,
                tiempo_trabajado:tiempo_trabajado,
                salario:salario,
                cantidad_horas_extra:cantidad_horas_extra,
                valorT_horas_extra:valorT_horas_extra,
                valorT_deducciones:valorT_deducciones,
                valorT_percepciones:valorT_percepciones,
                valorT_incapacidades:valorT_incapacidades,
                valor_arl:valor_arl,
                valor_eps:valor_eps,
                valor_afp:valor_afp,
                valor_total:valor_total,
                fecha_liquidacion: fecha_liquidacion,
                dias_liquidacion: dias_liquidacion,
                cesantias: cesantias,
                recibo:recibo
            }, {
                where: {id_recibo: id_recibo}
            });
            if (editarRecibo) {
                const reciboJ = JSON.stringify(editarRecibo);
                logger.info('Estado: ' + 201);
                logger.info('Recibo liquidacion editado: ' + reciboJ);

                res.json({
                    message: 'Recibo liquidacion editado'
                });
            }
        }catch (e) {
            logger.info('Estado: ' + 500);
            logger.info('Error editar Recibo liquidacion');

            res.status(500).json({
                message: 'Error editar Recibo liquidacion'
            });
        }
    }
}

const reciboController = new ReciboController();
export default reciboController;