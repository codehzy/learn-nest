import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import {
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(
    @GetUser() user: User,
    // @GetUser('email') email: string,
  ) {
    // console.log({
    //   email,
    // });

    return user;
  }

  @Patch()
  editUser() {}
}
