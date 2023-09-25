import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateEmailDto {
  @ApiProperty({ example: 'new@email.com', format: 'email' })
  @IsEmail()
  email: string;
}
