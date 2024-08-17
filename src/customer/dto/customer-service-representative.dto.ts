import { IsBoolean, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerServiceRepresentativeDto {
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsString()
  name: string;

  @IsBoolean()
  @Type(() => Boolean)
  isAvailable: boolean;
}