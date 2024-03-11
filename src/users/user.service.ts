import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { User } from '../types';
import { CreateUserDto, UpdatePasswordDto, User_Created } from './dto/user.dto';
import { Data } from 'src/data/data.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly data: Data) {}

  async findAll(): Promise<User[]> {
    const users = this.data.users;
    if (!users) {
      throw new NotFoundException('Users are not found');
    }
    return users.map((item) => new User_Created(item));
  }

  async findOne(id: string): Promise<User_Created> {
    const user = this.data.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return new User_Created(user);
  }

  create(createUserDto: CreateUserDto): User_Created {
    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.data.users.push(newUser);
    const result = new User_Created(newUser);
    delete result.password;
    return result;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User_Created> {
    const i = this.data.users.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    if (this.data.users[i].password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    this.data.users[i].password = updatePasswordDto.newPassword;
    this.data.users[i].version += 1;
    this.data.users[i].updatedAt = Date.now();
    const result = new User_Created(this.data.users[i]);
    delete result.password;
    return result;
  }

  remove(id: string): boolean {
    const i = this.data.users.findIndex((item) => item.id === id);
    if (i !== -1) {
      this.data.users.splice(i, 1);
      return true;
    }
    throw new NotFoundException('User is not found');
  }
}
