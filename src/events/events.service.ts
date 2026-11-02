// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { EventDto } from '../dto/event-dto';
// import { connect } from 'http2';

// @Injectable()
// export class EventsService {
//   constructor(private readonly prisma: PrismaService) {}

//   async getEvents() {
//     return this.prisma.event.findMany();
//   }

//   async createEvents(body: EventDto, userId: number) {
//     return this.prisma.event.create({
//       data: {
//         title: body.title,
//         description: body.description,
//         date: body.date,
//         address: body.address,
//         price: body.price,
//         capacity: body.capacity,
//         image: body.image,
//         user: {
//           connect: {
//             id: userId,
//           },
//         },
//       },
//     });
//   }

//   async deleteEvents(id: number) {
//     return this.prisma.event.delete({ where: { id } });
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventDto } from '../dto/event-dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents() {
    return this.prisma.event.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEventById(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
    });
    if (!event) {
      throw new NotFoundException('Мероприятие не найдено');
    }
    return event;
  }

  async getMyEvents(userId: number) {
    return this.prisma.event.findMany({
      where: { userId },
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createEvents(body: EventDto, userId: number) {
    return this.prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        address: body.address,
        price: body.price,
        capacity: body.capacity,
        image: body.image,
        category: body.category && body.category.trim() !== '' ? body.category : undefined,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateEvent(id: number, body: Partial<EventDto>, userId: number) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Мероприятие не найдено');
    if (event.userId !== userId) throw new Error('Нет прав на редактирование');

    return this.prisma.event.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        date: body.date ? new Date(body.date) : undefined,
        address: body.address,
        price: body.price,
        capacity: body.capacity ?? (body as any).seats,
        image: body.image,
        category: body.category,
      },
    });
  }

    async registerToEvent(eventId: number, userId: number) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } }) as any;
    const user = await this.prisma.user.findUnique({ where: { id: userId } }) as any;

    if (!event) throw new NotFoundException('Мероприятие не найдено');
    if (!user) throw new NotFoundException('Пользователь не найден');

    if (event.participantIds.length >= event.capacity) {
      throw new Error('Свободных мест больше нет');
    }

    if (event.participantIds.includes(userId)) {
      throw new Error('Вы уже записаны на это мероприятие');
    }

    // Приводим data к any, чтобы заглушить ошибку TS2353 из-за закешированных типов Prisma
    await this.prisma.event.update({
      where: { id: eventId },
      data: {
        participantIds: { push: userId }
      } as any
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        registeredIds: { push: eventId }
      } as any
    });

    return { message: 'Вы успешно записались на мероприятие' };
  }
  async deleteEvents(id: number) {
  return this.prisma.event.delete({
    where: { id },
  });
}
}