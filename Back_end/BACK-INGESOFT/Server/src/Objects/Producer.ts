

import AbstractFactory from "./abstractFactory";
import ObjectsFactory from "./objectsFactory";

 class Producer{

    public getAbstractFactoryRecibos(): AbstractFactory {
        return new ObjectsFactory();
    }

}

const producer = new Producer();
 export default producer;