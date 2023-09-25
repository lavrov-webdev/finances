import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from 'src/categories/dto/category.response.dto';
import { SprintResponseDto } from 'src/sprints/dto/sprint.response.dto';
import { TransactionResponseDto } from 'src/transactions/dto/transaction.response.dto';

export class EnvelopeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-08-07T08:10:58.772Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-08-07T08:10:58.772Z' })
  updatedAt: Date;

  @ApiProperty({ example: 1500 })
  amount: number;

  @ApiProperty({ example: 1 })
  categoryId: number | null;

  @ApiProperty({ example: 1 })
  sprintId: number;

  @ApiProperty({ example: 1 })
  userId: number;
}

export class EnvelopeWithTransactionsResponseDto extends EnvelopeResponseDto {
  @ApiProperty({ type: [TransactionResponseDto] })
  transactions: TransactionResponseDto[];
}

export class EnvelopeWithSptintDatesAndCategoryInfo extends EnvelopeResponseDto {
  @ApiProperty({
    example: {
      startDate: '2023-08-18T08:48:30.883Z',
      endDate: '2023-08-18T08:48:30.883Z',
    },
  })
  sprint: Pick<SprintResponseDto, 'startDate' | 'endDate'>;

  @ApiProperty({ example: { name: 'current category name' } })
  category: Pick<CategoryResponseDto, 'name'>;
}
