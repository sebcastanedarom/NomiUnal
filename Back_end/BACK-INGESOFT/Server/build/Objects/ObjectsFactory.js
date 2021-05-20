"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstractFactory_1 = __importDefault(require("./abstractFactory"));
const reciboMes_1 = __importDefault(require("./reciboMes"));
const liquidacion_1 = __importDefault(require("./liquidacion"));
const incapacidad_1 = __importDefault(require("./incapacidad"));
class ObjectsFactory extends abstractFactory_1.default {
    createRecibo(type) {
        if ("Recibo mes") {
            return new reciboMes_1.default(JSON);
        }
        else {
            return new liquidacion_1.default(JSON);
        }
    }
    createIncapacidad() {
        return new incapacidad_1.default();
    }
}
exports.default = ObjectsFactory;
