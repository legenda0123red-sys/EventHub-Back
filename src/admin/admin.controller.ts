import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('events/all')
  getAllEvents() {
    return this.adminService.getAllEvents();
  }

  @Put('events/update/:id')
  updateEvent(@Param('id') id: string, @Body('title') title: string) {
    return this.adminService.updateEvent(id, title);
  }

  @Delete('events/delete/:id')
  deleteEvent(@Param('id') id: string) {
    return this.adminService.deleteEvent(id);
  }

  @Get('users/all')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }
}
