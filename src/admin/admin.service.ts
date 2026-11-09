import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


const eventStatusMap: Record<string, string> = {
  PUBLISHED: 'Опубликовано',
  MODERATION: 'На модерации',
  DRAFT: 'Черновик',
};

const userStatusMap: Record<string, string> = {
  ACTIVE: 'Активен',
  INACTIVE: 'Неактивен',
  BANNED: 'Заблокирован',
};

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  
  async getAllEvents() {
    const dbEvents = await this.prisma.event.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        date: true,
        status: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return dbEvents.map((event) => ({
      id: event.id,
      title: event.title,
      category: event.category,
      date: event.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      author: event.user?.name || 'Неизвестно',
      status: eventStatusMap[event.status] || 'Черновик',
    }));
  }

  
  async updateEvent(id: string, title: string) {
    const numericId = Number(id);
    
    const event = await this.prisma.event.findUnique({ where: { id: numericId } });
    if (!event) throw new NotFoundException('Мероприятие не найдено');

    return this.prisma.event.update({
      where: { id: numericId },
      data: { title },
    });
  }

  
  async deleteEvent(id: string) {
    const numericId = Number(id);

    const event = await this.prisma.event.findUnique({ where: { id: numericId } });
    if (!event) throw new NotFoundException('Мероприятие не найдено');

    return this.prisma.event.delete({ where: { id: numericId } });
  }

 
  async getAllUsers() {
    const dbUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        events: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return dbUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === 'ADMIN' ? 'Администратор' : 'Пользователь',
      status: userStatusMap[user.status] || 'Неактивен',
      events: user.events.map((e) => e.title),
    }));
  }
}
