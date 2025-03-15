import pino from 'pino';

export interface ILogger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  debug?(message: string, meta?: any): void;
}

export class Logger implements ILogger {
  private logger = pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  });

  info(message: string, meta?: any) {
    this.logger.info({ msg: message, ...meta });
  }

  warn(message: string, meta?: any) {
    this.logger.warn({ msg: message, ...meta });
  }

  error(message: string, meta?: any) {
    this.logger.error({ msg: message, ...meta });
  }

  debug(message: string, meta?: any) {
    this.logger.debug?.({ msg: message, ...meta });
  }
}
