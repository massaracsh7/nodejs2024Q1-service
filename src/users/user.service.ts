import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User, User_Created } from '../types';
import { Data } from 'src/data/data.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly database: Data) {}

  async findAll(): Promise<User[]> {
    const users = await this.database.users;
    if (!users) {
      throw new NotFoundException('Users are not found');
    }
    return users.map((item) => new User_Created(item));
  }

  async findOne(id: string): Promise<User_Created> {
    const user = await this.database.users.find((item) => item.id === id);
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
    this.database.users.push(newUser);
    const result = new User_Created(newUser);
    delete result.password;
    return result;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User_Created> {
    const i = this.database.users.findIndex((item) => item.id === id);
    if (i === -1) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    if (this.database.users[i].password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }
    this.database.users[i].password = updatePasswordDto.newPassword;
    this.database.users[i].version += 1;
    this.database.users[i].updatedAt = Date.now();
    const result = new User_Created(this.database.users[i]);
    delete result.password;
    return result;
  }

  remove(id: string): boolean {
    const i = this.database.users.findIndex((item) => item.id === id);
    if (i !== -1) {
      this.database.users.splice(i, 1);
      return true;
    }
    throw new NotFoundException('User is not found');
  }
}
