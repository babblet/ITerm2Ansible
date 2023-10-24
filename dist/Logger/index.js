"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerColors = exports.LoggerType = void 0;
var TerminalColors;
(function (TerminalColors) {
    TerminalColors["RESET"] = "\u001B[0m";
    TerminalColors["WHITE"] = "\u001B[37m";
    TerminalColors["BLUE"] = "\u001B[34m";
    TerminalColors["YELLOW"] = "\u001B[33m";
    TerminalColors["RED"] = "\u001B[31m";
    TerminalColors["PINK"] = "\u001B[35m";
})(TerminalColors || (TerminalColors = {}));
var LoggerColors;
(function (LoggerColors) {
    LoggerColors["RESET"] = "\u001B[0m";
    LoggerColors["INFO"] = "\u001B[34m";
    LoggerColors["DEBUG"] = "\u001B[35m";
    LoggerColors["ERROR"] = "\u001B[31m";
    LoggerColors["WARNING"] = "\u001B[33m";
})(LoggerColors || (exports.LoggerColors = LoggerColors = {}));
var LoggerType;
(function (LoggerType) {
    LoggerType["INFO"] = "INFO";
    LoggerType["DEBUG"] = "DEBUG";
    LoggerType["ERROR"] = "ERROR";
    LoggerType["WARNING"] = "WARNING";
})(LoggerType || (exports.LoggerType = LoggerType = {}));
class Logger {
    static info(message) {
        Logger._log(LoggerType.INFO, `${message}`, LoggerColors.INFO);
    }
    static debug(message) {
        Logger._log(LoggerType.DEBUG, `${message}`, LoggerColors.DEBUG);
    }
    static warning(message) {
        Logger._log(LoggerType.WARNING, `${message}`, LoggerColors.WARNING);
    }
    static error(message) {
        Logger._log(LoggerType.ERROR, `${message}`, LoggerColors.ERROR);
    }
    static log(type, message, color) {
        Logger._log(type, message, color);
    }
    static _log(type, message, color) {
        const date = new Date().toISOString();
        console.log(`${color}${date} [${type}]:${LoggerColors.RESET} ${message}`);
    }
}
exports.default = Logger;
