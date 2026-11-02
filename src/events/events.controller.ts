// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseIntPipe,
//   Post,
//   Req,
//   UseGuards,
// } from '@nestjs/common';
// import { EventsService } from './events.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { EventDto } from '../dto/event-dto';
// import { RolesGuard } from '../auth/roles.guard';

// @Controller('events')
// export class EventsController {
//   constructor(private readonly events: EventsService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get('all')
//   async getEvents() {
//     return this.events.getEvents();
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Post('create')
//   async createEvents(
//     @Body() body: EventDto,
//     @Req() req: Request & { user: { sub: number } },
//   ) {
//     return this.events.createEvents(body, req.user.sub);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Delete('delete/:id')
//   deleteEvents(@Param('id', ParseIntPipe) id: number) {
//     return this.events.deleteEvents(id);
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EventDto } from '../dto/event-dto';

interface AuthenticatedRequest {
  user: {
    sub: number;
  };
}

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Get('all')
  async getEvents() {
    return this.events.getEvents();
  }

  // Список только моих мероприятий
  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyEvents(@Req() req: AuthenticatedRequest) {
    return this.events.getMyEvents(req.user.sub);
  }

  @Get(':id')
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.events.getEventById(id);
  }

  @UseGuards(JwtAuthGuard) 
  @Post('create')
  async createEvents(
    @Body() body: EventDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.events.createEvents(body, req.user.sub);
  }

  // Редактирование мероприятия
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<EventDto>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.events.updateEvent(id, body, req.user.sub);
  }

  @Delete('delete/:id')
  async deleteEvents(@Param('id', ParseIntPipe) id: number) {
    return this.events.deleteEvents(id);
  }
  // src/events/events.controller.ts

@UseGuards(JwtAuthGuard)
@Post(':id/register')
async registerToEvent(
  @Param('id', ParseIntPipe) id: number,
  @Req() req: AuthenticatedRequest,
) {
  return this.events.registerToEvent(id, req.user.sub);
}

}
