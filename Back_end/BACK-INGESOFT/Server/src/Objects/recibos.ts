



export default interface Recibos{
    createRecibo(id_empleado: bigint, fecha: Date): Promise<boolean>;
}
