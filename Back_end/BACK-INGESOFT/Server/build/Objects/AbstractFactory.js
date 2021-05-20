"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagoContratista_1 = __importDefault(require("./pagoContratista"));
const pagoNormal_1 = __importDefault(require("./pagoNormal"));
class AbstractFactory {
    executePago(type) {
        switch (type) {
            case "Pago Normal":
                return new pagoNormal_1.default();
                break;
            case "Pago Contratista":
                return new pagoContratista_1.default();
                break;
            default: return new pagoNormal_1.default();
        }
    }
}
exports.default = AbstractFactory;
