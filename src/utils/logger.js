const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // Уровень логирования (info, warn, error и т.д.)
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Логи в консоль
        new transports.File({ filename: 'logs/test.log' }) // Логи в файл
    ],
});

module.exports = logger;
