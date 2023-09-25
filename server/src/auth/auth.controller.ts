import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ description: 'Success login' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.signIn(signInDto, res);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }

  @ApiCreatedResponse({ description: 'User was successfully created' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @Post('create')
  async signUp(
    @Body() signUpDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.signUp(signUpDto, res);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }

  @ApiNoContentResponse({ description: 'User was successfully logout' })
  @Post('logout')
  async logout(@Res() res: Response) {
    await this.authService.logout(res);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
