import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TopicNodeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicNodeDto)  // Indica que `suggestions` es un array de `TopicNodeDto`
  suggestions?: TopicNodeDto[];
}