import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class CategoryResponseDto extends CreateCategoryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-08-07T08:06:31.872Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-08-07T08:06:31.872Z' })
  updatedAt: Date;

  @ApiProperty({ example: 2 })
  userId: number;
}
