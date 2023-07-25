enum LogLevel{
DEBUG = 'debug',
ERROR = 'error',
WARN = 'warn',
INFO = 'info'
}

class Logger{
  level : LogLevel;

  constructor(level:LogLevel){
    this.level = level;
  }

  error(...args:unknown[]):void {
    console.error('\x1b[41m%s\x1b[0m',...args)
  }

  debug(...args:unknown[]):void{
    if (this.level === LogLevel.DEBUG) {
      console.debug('\x1b[34m%s\x1b[0m',...args);
    }
  }

  warn(...args:unknown[]):void{
    if (
      this.level === LogLevel.DEBUG ||
      this.level === LogLevel.INFO ||
      this.level === LogLevel.WARN
    ) {
      console.warn('\x1b[33m%s\x1b[0m',...args);
    }
  }

  info(...args:unknown[]):void{
    if (this.level === LogLevel.DEBUG || this.level === LogLevel.INFO) {
      console.info('\x1b[32m%s\x1b[0m',...args);
    }
  }
}

export default Logger;
export {LogLevel};