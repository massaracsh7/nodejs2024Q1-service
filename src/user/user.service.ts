import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../types';

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

  //updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {}}

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
