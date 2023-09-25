import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsInt, Min } from 'class-validator';

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  id: number;
}
