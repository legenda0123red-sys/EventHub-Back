import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EventDto } from '../dto/event-dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getEvents() {
    return this.events.getEvents();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async createEvents(
    @Body() body: EventDto,
    @Req() req: Request & { user: { sub: number } },
  ) {
    return this.events.createEvents(body, req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  deleteEvents(@Param('id', ParseIntPipe) id: number) {
    return this.events.deleteEvents(id);
  }
}
