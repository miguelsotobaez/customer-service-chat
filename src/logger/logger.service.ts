import { Injectable } from '@nestjs/common';
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';
import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

@Injectable()
export class LoggerService {
  private readonly logger: WinstonLogger;

  constructor(private readonly configService: ConfigService) {
    const transportsArray: (
      | transports.ConsoleTransportInstance
      | transports.FileTransportInstance
    )[] = [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.ms(),
          nestWinstonModuleUtilities.format.nestLike('AppName', {
            prettyPrint: true,
          }),
        ),
      }),
    ];

    if (this.configService.get('log.file')) {
      transportsArray.push(new transports.File({ filename: 'combined.log' }));
    }

    const level: string = this.configService.get<string>('log.level') || 'info';
    this.logger = createLogger({
      level,
      transports: transportsArray,
    });
  }

  info(message: string, headers?: Record<string, any>) {
    this.logger.info(message, this.buildMessage(headers));
  }

  error(message: string, exception: Error, headers?: Record<string, any>) {
    this.logger.error(message, {
      ...this.buildMessage(headers),
      exception: exception.message,
      stack: exception.stack,
    });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  private buildMessage(headers?: Record<string, any>): any {
    const metadata = {};
    if (headers) {
      metadata['domain'] = headers['x-csc-domain'] || 'unknown';
    }
    return metadata;
  }
}
