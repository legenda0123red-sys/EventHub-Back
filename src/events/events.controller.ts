import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from '../events/events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    async getAllEvents(
        @Query('search') search?: string,
        @Query('category')category?: string,    
    ) {
        return this.eventsService.findAll({ search, category})
    }
    }