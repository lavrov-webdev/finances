import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from 'src/categories/dto/category.response.dto';

export class TransactionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-08-07T09:26:29.945Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-08-07T09:26:29.945Z' })
  updatedAt: Date;

  @ApiProperty({ example: 200 })
  amount: number;

  @ApiProperty({ example: '2023-07-09T00:00:00.000Z' })
  date: Date;

  @ApiProperty({ example: 'Test comment' })
  comment: string;

  @ApiProperty({ example: 1 })
  envelopeId: number;

  @ApiProperty({ example: 1 })
  sprintId: number;

  @ApiProperty({ example: 1 })
  categoryId: number | null;

  @ApiProperty({ example: 1 })
  userId: number;
}

export class TransactionWithCategoryName extends TransactionResponseDto {
  @ApiProperty({ example: { name: 'current category name' } })
  category: Pick<CategoryResponseDto, 'name'>;
}
