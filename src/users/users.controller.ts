import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dto/user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('all')
  async getUsers() {
    return this.users.getUsers();
  }

  @Post('create')
  async createUser(@Body() body: UserDto) {
    return this.users.createUsers(body);
  }

  @Get('one/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.users.getUserById(id);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.users.deleteUser(id);
  }
}
