import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/register-dto';
import { LoginDto } from '../dto/login-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Регистрация пользователя',
    description: 'Создаёт нового пользователя в системе.',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Данные для регистрации',
  })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    schema: {
      example: {
        id: 1,
        name: 'Sanjar',
        email: 'sanjar@gmail.com',
        role: 'USER',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким email уже существует',
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные регистрации',
  })
  async register(@Body() body: RegisterDto) {
    return this.auth.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Авторизация пользователя',
    description: 'Проверяет email и пароль, возвращает JWT access token.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Данные для входа',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешная авторизация',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          email: 'sanjar@gmail.com',
          name: 'Sanjar',
          role: 'USER',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Неверный email или пароль',
  })
  async login(@Body() body: LoginDto) {
    return this.auth.login(body);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Получить профиль пользователя',
    description: 'Возвращает данные текущего авторизованного пользователя.',
  })
  @ApiResponse({
    status: 200,
    description: 'Профиль пользователя успешно получен',
    schema: {
      example: {
        id: 1,
        name: 'Sanjar',
        email: 'sanjar@gmail.com',
        role: 'USER',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Отсутствует или недействителен JWT-токен',
  })
  async getMe(
    @Req()
    req: Request & {
      user: {
        sub: number;
      };
    },
  ) {
    return this.auth.getMe(req.user.sub);
  }
}