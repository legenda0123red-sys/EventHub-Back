import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserDto } from './user-dto';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
