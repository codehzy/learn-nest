import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
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

      return user;
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

    return user;
  }
}
