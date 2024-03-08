import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from '../types';
import { Data } from 'src/data/data.service';

@Injectable()
export class UserService {
  constructor(private readonly database: Data) {}

  findAll(): User[] {
    return this.database.users;
  }

  findOne(id: string): User {
    const user = this.database.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: 'sample-id', // You may want to generate a unique ID here
      ...createUserDto,
      version: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    this.database.users.push(newUser);
    return newUser;
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): User | null | false {
    const user = this.findOne(id);
    if (user.password !== updatePasswordDto.oldPassword) {
      return false;
    }
    user.password = updatePasswordDto.newPassword;
    return user;
  }

  remove(id: string): boolean {
    const index = this.database.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.database.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
