import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
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
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
