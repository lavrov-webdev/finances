import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) throw new NotFoundException('User not found');
    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new NotFoundException('Password or email is incorrect');
    const accessToken = await this.getAccessToken(user.id, user.email);
    this.setCookie(res, accessToken);
  }

  async signUp(signUpDto: CreateUserDto, res: Response) {
    const user = await this.userService.findByEmail(signUpDto.email);
    if (user) throw new ConflictException('User with that email already exist');
    const createdUser = await this.userService.create({
      ...signUpDto,
    });
    const accessToken = await this.getAccessToken(
      createdUser.id,
      createdUser.email,
    );
    this.setCookie(res, accessToken);
  }

  async logout(res: Response) {
    res.clearCookie('access_token');
  }

  private getAccessToken(id: number, email: string) {
    const payload = {
      sub: id,
      email: email,
    };
    return this.jwtService.signAsync(payload);
  }

  private setCookie = (res: Response, accessToken: string) => {
    res.cookie('access_token', accessToken, {
      expires: new Date(Date.now() + 60_000 * 60 * 24 * 30),
      httpOnly: true,
    });
  };
}
