import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { LoggerModule } from './logger/logger.module';
import { CustomerModule } from './customer/customer.module';
import { TopicsModule } from './topics/topics.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    TerminusModule,
    CustomerModule,
    TopicsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
