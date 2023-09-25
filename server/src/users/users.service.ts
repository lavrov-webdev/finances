import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { UpdateEmailDto } from './dto/update-email.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await this.generatePasswordHash(createUserDto.password);
    const createdUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hash,
      },
    });
    return createdUser;
  }

  async find(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const { password, ...rest } = user;
    return rest;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isPasswordValid) throw new BadRequestException('Invalid old password');

    const hash = await this.generatePasswordHash(updatePasswordDto.newPassword);
    await this.prisma.user.update({
      where: { id },
      data: {
        password: hash,
      },
    });
  }

  async updateEmail(updateEmailDto: UpdateEmailDto, id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { email: updateEmailDto.email },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  private generatePasswordHash = (password: string) =>
    bcrypt.hash(password, +process.env.HASH_ROUNDS);
}
