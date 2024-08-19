import { Injectable } from '@nestjs/common';
import { TopicNodeDto } from './dto/topic-node.dto';

@Injectable()
export class TopicsService {
  private topicsTree: TopicNodeDto[] = [
    {
      name: 'Football',
      suggestions: [
        {
          name: 'Premier League',
          suggestions: [
            { name: 'Liverpool' },
            { name: 'Man. UTD' },
            { name: 'Man. City' },
          ],
        },
        {
          name: 'Serie A',
          suggestions: [
            { name: 'Milan' },
            { name: 'Inter' },
            { name: 'Juventus' },
          ],
        },
      ],
    },
    {
      name: 'Books',
      suggestions: [
        {
          name: 'Investment',
          suggestions: [
            { name: 'The Intelligent Investor - Benjamin Graham' },
            { name: 'Rich Dad, Poor Dad - Robert Kiyosaki' },
          ],
        },
        {
          name: 'Children',
          suggestions: [
            { name: 'Momo - Michael Ende' },
            { name: 'BFG - Roald Dahl' },
          ],
        },
      ],
    },
  ];

  getTopics(): TopicNodeDto[] {
    return this.topicsTree;
  }
}
