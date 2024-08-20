import { Test, TestingModule } from '@nestjs/testing';
import { TopicsService } from './topics.service';
import { TopicNodeDto } from './dto/topic-node.dto';

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicsService],
    }).compile();

    service = module.get<TopicsService>(TopicsService);
  });

  it('should return the topics tree', () => {
    const topics: TopicNodeDto[] = service.getTopics();
    expect(topics).toBeDefined();
    expect(topics.length).toBeGreaterThan(0);

    const footballTopic = topics.find((topic) => topic.name === 'Football');
    expect(footballTopic).toBeDefined();
    expect(footballTopic.suggestions).toBeDefined();
    expect(footballTopic.suggestions.length).toBeGreaterThan(0);

    const booksTopic = topics.find((topic) => topic.name === 'Books');
    expect(booksTopic).toBeDefined();
    expect(booksTopic.suggestions).toBeDefined();
    expect(booksTopic.suggestions.length).toBeGreaterThan(0);
  });
});
