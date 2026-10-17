import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../dto/user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUsers(body: UserDto) {
    return this.prisma.user.create({ data: { ...body } });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
