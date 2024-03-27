import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'prisma/prisma-client';
import { CreateUserDto, UpdatePasswordDto, User_Created } from './dto/user.dto';
import { Prisma } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly prisma: Prisma) {}

  async findAll(): Promise<User[]> {
    const users = this.prisma.user.findMany();
    if (!users) {
      throw new NotFoundException('Users are not found');
    }
    return await users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.prisma.user.findUniqueOrThrow({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return await user;
  }

  async create(createUserDto: CreateUserDto): Promise<User_Created> {
    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.prisma.user.create({
      data: {
        ...newUser,
      },
    });
    const result = new User_Created(newUser);
    delete result.password;
    return result;
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    const newUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: user.version + 1,
      },
    });
    const result = newUser;
    delete result.password;
    return result;
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }
}
