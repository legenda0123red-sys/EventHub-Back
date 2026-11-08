import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'sanjar@gmail.com',
    description: 'Email пользователя',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password6',
    description: 'Пароль пользователя(минимум 6 символов)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
