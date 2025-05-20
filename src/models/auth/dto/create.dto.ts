import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserCreate {
  @IsString()
  fullname: string;

  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
