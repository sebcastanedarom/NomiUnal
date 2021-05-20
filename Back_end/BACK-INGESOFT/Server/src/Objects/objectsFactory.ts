import AbstractFactory from "./abstractFactory";
import Recibos from "./recibos";
import ReciboMes from "./reciboMes";
import Liquidacion from "./liquidacion";
import Incapacidades from "./incapacidades";
import Incapacidad from "./incapacidad";


 export default class ObjectsFactory extends AbstractFactory {

     createRecibo(type: string): Recibos {

         if("Recibo mes"){
             return new ReciboMes(JSON);
         }else{
             return new Liquidacion(JSON);
         }

     }

     createIncapacidad(): Incapacidades {
         return new Incapacidad();
     }

 }
