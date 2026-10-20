import { Injectable } from '@nestjs/common';
import { PrismaService} from '../prisma/prisma.service';


@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) {}
        async findAll(filters: { search?: string; category?: string }) {
            const { search, category } = filters;

            return this.prisma.event.findMany ({
                where: {
                    date: {
                        gte: new Date(),
                    },
                    ...(category && {category}),
                    ...(search && {
                        OR: [
                            { title: {contains: search, mode: 'insensitive' }},
                                { description: { contains: search, mode: 'insensitive' }},
                        ],
                    }),
                },
                orderBy: {
                    date: 'asc',
                },
            });
        }
    }
