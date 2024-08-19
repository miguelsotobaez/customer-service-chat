import { IsBoolean, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerServiceRepresentativeDto {
  @ApiProperty({
    description: 'Unique identifier of the representative',
    example: 1,
  })
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({
    description: 'Name of the representative',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Indicates if the representative is currently available',
    example: true,
  })
  @IsBoolean()
  @Type(() => Boolean)
  isAvailable: boolean;
}
