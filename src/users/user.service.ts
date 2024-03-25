import { Injectable } from '@nestjs/common';
import { User } from 'prisma/prisma-client';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { Prisma } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: Prisma) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async updatePassword(
    id: string,
    { newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const newUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: user.version + 1,
      },
    });
    return newUser;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }
}
