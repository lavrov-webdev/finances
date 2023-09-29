import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { datePropertyTranformer } from 'src/transformers/date.transformer';

export class UpdateSprintDto {
  @ApiProperty({ example: '2023-06-23', required: false })
  @Transform(datePropertyTranformer)
  startDate?: string;

  @ApiProperty({ example: '2023-06-23', required: false })
  @Transform(datePropertyTranformer)
  endDate?: string;

  @ApiProperty({ example: 20000, required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  startSum?: number;
}
