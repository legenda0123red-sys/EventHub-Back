import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UserDto } from '../dto/user-dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('all')
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей' })
  async getUsers() {
    return this.users.getUsers();
  }

  @Post('create')
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'Пользователь создан' })
  async createUser(@Body() body: UserDto) {
    return this.users.createUsers(body);
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.users.getUserById(id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь удалён' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.users.deleteUser(id);
  }
}
