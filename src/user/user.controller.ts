import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from '../types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!this.isValidUUID(id)) {
      return { statusCode: 400, message: 'Invalid user ID' };
    }
    const updatedUser = this.userService.updatePassword(id, updatePasswordDto);
    if (!updatedUser) {
      return { statusCode: 404, message: 'User not found' };
    }
    return { statusCode: 200, data: updatedUser };
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
