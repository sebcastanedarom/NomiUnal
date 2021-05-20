"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const incapacidadesModel_1 = __importDefault(require("../models/incapacidadesModel"));
class Incapacidad {
    createIncapacidad(licenciaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newtable = yield incapacidadesModel_1.default.create({
                    id_empleado: licenciaData.idEmpleado,
                    tipo: licenciaData.tipo,
                    descripcion: licenciaData.descripcion,
                    tiempo_incapacidad: licenciaData.tiempo_incapacidad,
                    fecha_inicio: licenciaData.fecha_inicio,
                    fecha_final: licenciaData.fecha_final
                }, {
                    fields: ['id_empleado', 'tipo', 'descripcion', 'tiempo_incapacidad', 'fecha_inicio', 'fecha_final']
                });
                if (newtable) {
                    return true;
                }
            }
            catch (error) {
                console.log(error);
                return false;
            }
            return false;
        });
    }
}
exports.default = Incapacidad;
