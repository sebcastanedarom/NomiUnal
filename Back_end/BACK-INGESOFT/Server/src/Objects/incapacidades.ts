
export default interface Incapacidades{
    createIncapacidad(licenciaData: {idEmpleado: bigint, tipo: string, descripcion: string, tiempo_incapacidad: bigint,
        fecha_inicio: any, fecha_final: any }): Promise<boolean>;
}
