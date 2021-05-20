


import Recibos from "./recibos";
import Incapacidades from "./incapacidades";
import PagoContratista from "./pagoContratista";
import PagoNormal from "./pagoNormal";
import TipoPago from "./tipoPago";


 export default abstract class AbstractFactory{

    public executePago(type: string): TipoPago{
        switch (type) {
            case "Pago Normal": return new PagoNormal(); break;
            case "Pago Contratista": return new PagoContratista(); break;
            default: return new PagoNormal();
        }
    }

     public abstract createRecibo (type: string): Recibos;
     public abstract createIncapacidad(): Incapacidades;

 }