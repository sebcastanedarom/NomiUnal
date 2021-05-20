"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = winston_1.createLogger({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.simple(), winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json(), winston_1.format.printf(info1 => '[' + info1.timestamp + ']' + ' ' + info1.level + ': ' + info1.message)),
    defaultMeta: { service: 'Nomina' },
    transports: [
        new winston_1.transports.File({
            maxsize: 5120000,
            maxFiles: 20,
            filename: __dirname + '/../logs/logs_nomina'
        }),
        new winston_1.transports.File({
            maxsize: 5120000,
            maxFiles: 1000,
            filename: __dirname + '/../logs/logs_nomina_errs',
            level: 'error'
        }),
    ]
});
exports.default = logger;
