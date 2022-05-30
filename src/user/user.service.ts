import { EditUserDto } from './dto/edit.user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.query(
      'select * from user',
    );
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.save(dto);
  }
}
