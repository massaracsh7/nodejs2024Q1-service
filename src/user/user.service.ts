import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../types';

@Injectable()
export class UserService {
  private readonly users = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { id: 'sample-id', ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    const user = this.users[userIndex];
    if (user.password !== updatePasswordDto.oldPassword) {
      return false;
    }
    this.users[userIndex].password = updatePasswordDto.newPassword;
    return this.users[userIndex];
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
