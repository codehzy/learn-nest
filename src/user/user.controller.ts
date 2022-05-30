import { UserService } from './user.service';
import {
  CreateUserDto,
  EditUserDto,
} from './dto';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { UserEntity } from './entities';

// @UseGuards(JwtGuard)
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

  @Get('list')
  async findAll(): Promise<UserEntity[]> {
    console.log(this.userService.findAll());

    return await this.userService.findAll();
  }

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    console.log(`新增了${dto}`);

    return await this.userService.createUser(dto);
  }
}
