
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserDto } from '../dto/user-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

interface AuthenticatedRequest {
  user: {
    sub: number;
  };
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/events')
  @ApiOperation({
    summary: 'Получить мероприятия текущего пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Объект с созданными и посещаемыми ивентами',
  })
  async getMyEventsAndRegistrations(@Req() req: AuthenticatedRequest) {
    return this.users.getMyEventsAndRegistrations(req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @ApiOperation({
    summary: 'Получить всех пользователей',
    description: 'Возвращает список всех зарегистрированных пользователей.',
  })
  @ApiResponse({
    status: 200,
    description: 'Список пользователей успешно получен',
    schema: {
      example: [
        {
          id: 1,
          name: 'Sanjar',
          email: 'sanjar@gmail.com',
          role: 'USER',
        },
        {
          id: 2,
          name: 'Admin',
          email: 'admin@gmail.com',
          role: 'ADMIN',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Отсутствует или недействителен JWT-токен',
  })
  @ApiResponse({
    status: 403,
    description: 'Недостаточно прав для выполнения операции',
  })
  async getUsers() {
    return this.users.getUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @ApiOperation({
    summary: 'Создать пользователя',
    description: 'Создаёт нового пользователя с именем, email и паролем.',
  })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан',
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
    description: 'Ошибка валидации данных',
  })
  async createUser(@Body() body: UserDto) {
    return this.users.createUsers(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('one/:id')
  @ApiOperation({
    summary: 'Получить пользователя по ID',
    description: 'Находит пользователя по его уникальному идентификатору.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Уникальный ID пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь найден',
    schema: {
      example: {
        id: 1,
        name: 'Sanjar',
        email: 'sanjar@gmail.com',
        role: 'USER',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.users.getUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Удалить пользователя',
    description: 'Удаляет пользователя по его ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID пользователя, которого нужно удалить',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно удалён',
    schema: {
      example: {
        message: 'Пользователь успешно удалён',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.users.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('email/:email')
  @ApiOperation({
    summary: 'Найти пользователя по email',
    description: 'Возвращает пользователя с указанным email.',
  })
  @ApiParam({
    name: 'email',
    type: String,
    example: 'sanjar@gmail.com',
    description: 'Email пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь найден',
    schema: {
      example: {
        id: 1,
        name: 'Sanjar',
        email: 'sanjar@gmail.com',
        role: 'USER',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async findUserByEmail(@Param('email') email: string) {
    return this.users.findUserByEmail(email);
  }
}
