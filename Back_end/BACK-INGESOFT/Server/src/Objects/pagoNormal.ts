import TipoPago from "./tipoPago";
import empleados from "../models/empleadosModel";
import reciboModel from "../models/recibosModel";
import Sequelize from "sequelize";
import deducciones from "../models/deduccionesModel";
import incapacidades from "../models/incapacidadesModel";
import percepciones from "../models/percepcionesModel";
import horasExtra from "../models/horasExtraModel";
import areasCargos from "../models/areasCargosModel";
import cuentas from "../models/cuentaModel";
import bancos from "../models/bancoModel";


export default class PagoNormal implements TipoPago{
    async appyPago(identificacion: bigint): Promise<any> {
        const empleado = await empleados.findAll({where:{identificacion: identificacion},
            attributes: ['id_empleado', 'id_area', 'id_cargo', 'id_cuenta']})

        const recibo = await reciboModel.findOne({where:{id_empleado: empleado[0].id_empleado},
            attributes:['id_recibo','fecha']})

        const {Op} =  Sequelize;
        const deduccion = await deducciones.findAll({
            where:{
                id_empleado: empleado[0].id_empleado,
                valor: {[Op.gt]: 0}
            }});

        let fecha = new Date(recibo.fecha)
        let fechas = fecha.getFullYear().toString()+' '+fecha.getMonth().toString()+' '+'28';
        fecha = new Date(fechas);
        const incapacidad = await incapacidades.findAll({
            where:{
                id_empleado: empleado[0].id_empleado,
                fecha_inicio : {[Op.or]: [{[Op.lte]: recibo.fecha}, {[Op.gt]: fecha}]}
            }});

        const percepcion = await percepciones.findAll({where:{id_recibo: recibo.id_recibo}})
        const horaExtra = await horasExtra.findAll({where:{id_recibo: recibo.id_recibo}})

        const salarioB = await areasCargos.findAll(
            {where:{id_area: empleado[0].id_area, id_cargo: empleado[0].id_cargo},
                attributes: ['salarioBase']})
        let salario = salarioB[0].salarioBase;

        var diasNoTrabajo = 0;
        var idIncapacidades: any=[];
        for (let i = 0; i < incapacidad.length; i++){
            if(incapacidad[i].tipo == ("Licencia No remunerada") || incapacidad[i].tipo == ( "Incapacidad no Justificada")){
                diasNoTrabajo= incapacidad[i].tiempo_incapacidad + diasNoTrabajo;
            }
            idIncapacidades.push(incapacidad[i].id_incapacidad);
        }

        const diasTrabajado = 30-diasNoTrabajo;
        const valorIncapacidad = (diasNoTrabajo*salario/30);

        var idDeducciones: any =[];
        var deduccionesTotal=0;
        for (let i = 0; i < deduccion.length; i++){

            deduccionesTotal= deduccionesTotal + deduccion[i].valor;
            idDeducciones.push(deduccion[0].id_deduccion);
        }

        var horasExtras= 0;
        var valorHoras = 0;
        for (let i = 0; i < horaExtra.length; i++){
            horasExtras= horasExtras+horaExtra[0].numero_horas;
            valorHoras= valorHoras+ (horaExtra[0].numero_horas*(salario/240)*0.25);
        }

        const arl = salario*0.0522;
        const afp= salario*0.165;
        const eps = salario*0.125;



        var PercepTotal=0;
        for (let i = 0; i < percepcion.length; i++){
            PercepTotal= PercepTotal + percepcion[i].valor;
        }
        const salarioF = salario-valorIncapacidad-eps-afp + valorHoras+ PercepTotal;


        const cuenta = await cuentas.findAll({where:{id_cuenta: empleado[0].id_cuenta},
            attributes:['id_banco', 'numero_cuenta']});

        const ncuenta = cuenta[0].numero_cuenta;

        const banco = await bancos.findAll({where:{id_banco: cuenta[0].id_banco},
            attributes:['nombre_banco']})

        return {recibo, salario, diasTrabajado,deduccionesTotal, PercepTotal, valorIncapacidad, horasExtras,
            valorHoras, arl, afp, eps, salarioF, banco, ncuenta, idIncapacidades, idDeducciones};
    }
}