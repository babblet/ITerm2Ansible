type LoggerTypeType = 'INFO' | 'DEBUG' | 'ERROR' | 'WARNING';
enum TerminalColors {
  RESET = '\x1b[0m',
  WHITE = '\x1b[37m',
  BLUE = '\x1b[34m',
  YELLOW = '\x1b[33m',
  RED = '\x1b[31m',
  PINK = '\x1b[35m',
}
enum LoggerColors {
  RESET = TerminalColors.RESET,
  INFO = TerminalColors.BLUE,
  DEBUG = TerminalColors.PINK,
  ERROR = TerminalColors.RED,
  WARNING = TerminalColors.YELLOW,
}
enum LoggerType {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}

class Logger {
  static info(message: string) {
    Logger._log(LoggerType.INFO, `${message}`, LoggerColors.INFO);
  }

  static debug(message: string) {
    Logger._log(LoggerType.DEBUG, `${message}`, LoggerColors.DEBUG);
  }

  static warning(message: string) {
    Logger._log(LoggerType.WARNING, `${message}`, LoggerColors.WARNING);
  }

  static error(message: string) {
    Logger._log(LoggerType.ERROR, `${message}`, LoggerColors.ERROR);
  }

  static log(type: LoggerTypeType, message: string, color: LoggerColors) {
    Logger._log(type, message, color);       
  }

  static _log(type: LoggerTypeType, message: string, color: LoggerColors) {
    const date = new Date().toISOString();
    console.log(`${color}${date} [${type}]:${LoggerColors.RESET} ${message}`);
  }
}

export default Logger;
export { LoggerType, LoggerColors};
export type { LoggerTypeType };