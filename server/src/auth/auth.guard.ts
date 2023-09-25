import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = this.extractTokenFromCookie(request.headers.cookie);
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const { password, ...userToReturn } = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      request['user'] = userToReturn;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
    return true;
  }

  private extractTokenFromCookie(cookies: string): string | undefined {
    const cookiesArray = cookies.split('; ').map((cookie) => cookie.split('='));
    return cookiesArray.find((cookie) => cookie[0] === 'access_token')[1];
  }
}
