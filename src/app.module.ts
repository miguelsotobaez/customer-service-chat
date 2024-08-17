import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [CustomerModule, TopicsModule],
})
export class AppModule {}
