import Recibos from "./recibos";
import reciboModel from "../models/recibosModel";
import logger from "../utils/logger";

export default class ReciboMes implements Recibos {

    public reciboMes: JSON;

    constructor(reciboData: JSON) {
        this.reciboMes= reciboData;
    }

    async createRecibo(id_empleado: bigint, fecha: Date): Promise<boolean>{
        try {
            let newtable = await reciboModel.create({
                id_empleado,
                tipo:"Recibo mes",
                fecha: fecha,
                tiempo_trabajado: 0,
                salario: 0,
                cantidad_horas_extra: null,
                valorT_horas_extra: null,
                valorT_deducciones: null,
                valorT_percepciones: null,
                valorT_incapacidades: null,
                valor_impuestos: 0,
                valor_arl: 0,
                valor_eps: 0,
                valor_afp: 0,
                valor_total: 0,
                fecha_liquidacion: 0,
                dias_liquidacion: 0,
                cesantias: 0,
                recibo: ''
            }, {
                fields: ['id_empleado', 'fecha', 'tiempo_trabajado', 'salario', 'cantidad_horas_extra', 'valorT_horas_extra', 'valorT_deducciones',
                    'valorT_percepciones', 'valorT_incapacidades', 'valor_impuestos', 'valor_arl', 'valor_eps', 'valor_afp', 'valor_total',
                    'fecha_liquidacion', 'dias_liquidacion', 'cesantias', 'recibo']
            });
            if (newtable) {
                const recibo = JSON.stringify(newtable);
                logger.info('Estado: ' + 201);
                logger.info('Recibos creado: ' + recibo);

                return true;
            }
        } catch (error) {
            console.log(error)
            logger.info('Estado: ' + 500);
            logger.info('Error crear nuevo recibo');

            return false;
        }
        return false;
    }

}
