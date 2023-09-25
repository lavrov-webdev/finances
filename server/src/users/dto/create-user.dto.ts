import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'mail@domain.com', format: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password', minLength: 6, maxLength: 20 })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
