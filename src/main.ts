import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './exception-filters/all-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const loggerService = app.get<LoggerService>(LoggerService);

  // Global Pipes and Middleware
  app.useGlobalPipes(new ValidationPipe()); //Only if i need to validate DTO before  it is handled by controllers
  app.use(helmet()); //Protect from common web vulnerabilities like cross-site scripting (XSS), clickjacking
  app.enableCors({ origin: true }); //For now its allow to any origin, need to change to frontend url if its in production
  app.useGlobalFilters(new AllExceptionsFilter(loggerService, configService));

  // Set global prefix if needed
  app.setGlobalPrefix('api'); // This will prepend 'api' to all routes, like '/api/v1/...'

  // Enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger setup for API documentation
  if (configService.get<string>('environment') === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Customer Service Chat API')
      .setDescription('Customer Service Chat API Microservice')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document); // Swagger available at '/api-docs'
  }

  // Start the application
  const port = configService.get<string>('port') || 3000;
  await app.listen(port);
}

bootstrap();
