import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TopicNodeDto {
  @ApiProperty({
    description: 'Name of the topic',
    example: 'Football',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'List of sub-topics or suggestions related to the current topic',
    type: [TopicNodeDto],
    required: false,
    example: [
      {
        name: 'Soccer',
        suggestions: [],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicNodeDto)
  suggestions?: TopicNodeDto[];
}
