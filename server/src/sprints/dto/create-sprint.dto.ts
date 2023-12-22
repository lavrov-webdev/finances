import { Transform, Type } from 'class-transformer';
import { CreateEnvelopeDto } from 'src/envelopes/dto/create-envelope.dto';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { datePropertyTranformer } from 'src/transformers/date.transformer';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateSprintDto {
  @ApiProperty({ example: '2023-06-23' })
  @Transform(datePropertyTranformer)
  startDate: string;

  @ApiProperty({ example: '2023-07-10' })
  @Transform(datePropertyTranformer)
  endDate: string;

  @ApiProperty({ example: 20000 })
  @IsInt()
  @Min(0)
  startSum: number;

  @ApiProperty({ type: [OmitType(CreateEnvelopeDto, ['sprintId'])] })
  @IsArray()
  @Type(() => OmitType(CreateEnvelopeDto, ['sprintId']))
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  envelopes: Omit<CreateEnvelopeDto, 'sprintId'>[];
}
