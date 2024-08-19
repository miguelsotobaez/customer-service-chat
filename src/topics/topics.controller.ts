import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { TopicNodeDto } from './dto/topic-node.dto';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @ApiResponse({
    status: 200,
    description: 'List of topics',
    type: [TopicNodeDto],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get()
  async getTopics(): Promise<TopicNodeDto[]> {
    return await this.topicsService.getTopics();
  }
}
