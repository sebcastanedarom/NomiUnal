
import incapacidadesModel from "../models/incapacidadesModel";
import Incapacidades from "./incapacidades";

export default class Incapacidad implements Incapacidades{

    async createIncapacidad(licenciaData: {idEmpleado: bigint, tipo: string, descripcion: string, tiempo_incapacidad: bigint,
        fecha_inicio: any, fecha_final: any }): Promise<boolean>{
        try {
            let newtable = await incapacidadesModel.create({
                id_empleado: licenciaData.idEmpleado,
                tipo: licenciaData.tipo,
                descripcion: licenciaData.descripcion,
                tiempo_incapacidad: licenciaData.tiempo_incapacidad,
                fecha_inicio: licenciaData.fecha_inicio,
                fecha_final: licenciaData.fecha_final
            }, {
                fields: ['id_empleado','tipo', 'descripcion', 'tiempo_incapacidad', 'fecha_inicio', 'fecha_final']
            });
            if (newtable) {
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        return false;
    }
}
