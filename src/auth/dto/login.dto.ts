import { IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}