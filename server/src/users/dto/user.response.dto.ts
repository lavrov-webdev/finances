import { CreateUserDto } from './create-user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserResponseDto extends OmitType(CreateUserDto, ['password']) {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2023-08-06T10:30:14.372Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-08-06T10:30:14.372Z' })
  updatedAt: Date;
}
