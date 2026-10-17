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

    async getMyEvents(userId: number) {
    const [created, registrations] = await Promise.all([
      this.prisma.event.findMany({
        where: { organizerId: userId },
        orderBy: { date: 'asc' },
      }),
      this.prisma.registration.findMany({
        where: { userId },
        include: { event: true },
        orderBy: { event: { date: 'asc' } },
      }),
    ]);

    const toDto = (e: (typeof created)[number]) => ({
      id: String(e.id),
      title: e.title,
      description: e.description,
      date: e.date.toISOString().slice(0, 10), // YYYY-MM-DD
      time: e.time,
      address: e.address,
      category: e.category,
      price: e.price,
      seats: e.seats,
      imageUrl: e.imageUrl,
    });

    return {
      created: created.map(toDto),
      registered: registrations.map((r) => toDto(r.event)),
    };
  }
}

