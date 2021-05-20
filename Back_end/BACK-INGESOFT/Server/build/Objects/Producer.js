"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectsFactory_1 = __importDefault(require("./objectsFactory"));
class Producer {
    getAbstractFactoryRecibos() {
        return new objectsFactory_1.default();
    }
}
const producer = new Producer();
exports.default = producer;
