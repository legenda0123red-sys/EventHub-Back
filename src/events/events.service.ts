import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventDto } from '../dto/event-dto';
import { connect } from 'http2';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents() {
    return this.prisma.event.findMany();
  }

  async createEvents(body: EventDto, userId: number) {
    return this.prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: body.date,
        address: body.address,
        price: body.price,
        capacity: body.capacity,
        image: body.image,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async deleteEvents(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
