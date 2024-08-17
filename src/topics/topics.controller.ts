import { Controller, Get } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicNodeDto } from './dto/topic-node.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getTopics(): TopicNodeDto[] {
    return this.topicsService.getTopics();
  }
}