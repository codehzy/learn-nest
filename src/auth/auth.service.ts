import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    try {
      // generate password hash
      const hash = await argon.hash(dto.password);
      // save the new user to the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      // 处理email相同防止创建 用户抛错
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Email already exists',
          );
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    // 寻找用户email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // 如果用户不存在，报错
    if (!user)
      throw new ForbiddenException('用户不存在');
    // 比较密码
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // 如果密码比较不对，报错
    if (!pwMatches)
      throw new ForbiddenException('密码错误');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    emial: string,
  ): Promise<{ access_token: string }> {
    const payLoad = {
      sub: userId,
      emial,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(
      payLoad,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );
    return {
      access_token: token,
    };
  }
}
