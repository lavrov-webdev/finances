import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/interfaces';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.response.dto';

@ApiTags('users')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  getMe(@Request() req: RequestWithUser): Promise<UserResponseDto> {
    return this.usersService.find(req.user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('password')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'Validation error' })
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Request() req: RequestWithUser,
  ) {
    return this.usersService.updatePassword(updatePasswordDto, req.user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('email')
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ description: 'Validation error' })
  updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Request() req: RequestWithUser,
  ) {
    return this.usersService.updateEmail(updateEmailDto, req.user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  @ApiNoContentResponse()
  remove(@Request() req: RequestWithUser) {
    return this.usersService.remove(req.user.id);
  }
}
