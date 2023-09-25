import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { datePropertyTranformer } from 'src/transformers/date.transformer';

export class UpdateSprintDto {
  @ApiProperty({ example: '2023-06-23', required: false })
  @Transform(datePropertyTranformer)
  startDate?: string;

  @ApiProperty({ example: '2023-06-23', required: false })
  @Transform(datePropertyTranformer)
  endDate?: string;
}
