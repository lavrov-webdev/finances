import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { datePropertyTranformer } from 'src/transformers/date.transformer';

export class UpdateTransactionDto {
  @ApiProperty({ example: '2023-09-20', required: false })
  @Transform(datePropertyTranformer)
  date?: string;

  @ApiProperty({ example: 200, required: false })
  amount?: number;

  @ApiProperty({ example: 'New comment', required: false })
  comment?: string;
}
