import { IsByteLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsByteLength(3, 15)
  @IsString()
  password: string;
}
