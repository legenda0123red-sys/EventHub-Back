// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { UserDto } from '../dto/user-dto';

// @Injectable()
// export class UsersService {
//   constructor(private readonly prisma: PrismaService) {}
//   async getUsers() {
//     return this.prisma.user.findMany();
//   }

//   async createUsers(body: UserDto) {
//     return this.prisma.user.create({ data:  { ...body } });
//   }

//   async getUserById(id: number) {
//     return this.prisma.user.findUnique({ where: { id } });
//   }

//   async deleteUser(id: number) {
//     return this.prisma.user.delete({ where: { id } });
//   }

//   async findUserByEmail(email: string) {
//     return this.prisma.user.findUnique({ where: { email } });
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../dto/user-dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // src/users/users.service.ts

  async getMyEventsAndRegistrations(userId: number) {
    // Приводим к any для защиты от устаревшего кэша типов Prisma CLI v7
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    }) as any;

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const createdEvents = await this.prisma.event.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    const registeredEvents = await this.prisma.event.findMany({
      where: {
        id: { in: user.registeredIds || [] }
      },
      orderBy: { createdAt: 'desc' }
    });

    return {
      created: createdEvents,
      registered: registeredEvents
    };
  }


  async createUsers(body: UserDto) {
    return this.prisma.user.create({ 
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: (body.role || 'USER') as any,
      } 
    });
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
