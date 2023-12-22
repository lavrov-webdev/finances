import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  @Min(0)
  @ApiProperty({ example: 1, minimum: 0 })
  envelopeId: number;

  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @ApiProperty({ example: '2023-06-30' })
  date: string;

  @ApiProperty({ example: 150, minimum: 0 })
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'Test comment', required: false, maxLength: 60 })
  @IsString()
  @MaxLength(60)
  @IsOptional()
  comment?: string;
}
