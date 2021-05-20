
import {createLogger, format, transports} from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.errors({stack: true}),
        format.splat(),
        format.json(),
        format.printf(info1 => '['+info1.timestamp+']'+' '+info1.level+': '+info1.message)
    ),
    defaultMeta: {service: 'Nomina'},
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 20,
            filename: __dirname+'/../logs/logs_nomina'
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 1000,
            filename: __dirname+'/../logs/logs_nomina_errs',
            level: 'error'
        }),
    ]
});


export default logger;