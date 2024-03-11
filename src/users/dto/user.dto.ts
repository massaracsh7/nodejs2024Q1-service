import { IsNotEmpty, IsString } from 'class-validator';

export class User_Created {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  password: string;

  constructor(partial: Partial<User_Created>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
