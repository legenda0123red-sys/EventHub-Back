
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'Sanjar',
    description: 'Имя пользователя',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'sanjar@gmail.com',
    description: 'Email пользователя',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль пользователя (минимум 6 символов)',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: 'USER',
    description: 'Роль пользователя',
    enum: ['USER', 'ADMIN'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['USER', 'ADMIN'])
  role: string;
}
