import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateEnvelopeDto {
  @ApiProperty({ example: 1000 })
  @IsInt()
  @Min(0)
  amount: number;
}
