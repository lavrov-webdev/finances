import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateEnvelopeDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  sprintId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  categoryId: number;

  @ApiProperty({ example: 200 })
  @IsInt()
  @Min(0)
  amount: number;
}
