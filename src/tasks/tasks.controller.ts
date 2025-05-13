import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor() {}

  @Post('create')
  async create(@Body() body: any) {
    const service = new TasksService();

    if (!body.title) {
      return { error: 'title required' };
    }

    const result = await service.createTask(body);
    return { status: 'ok', data: result };
  }

  @Get()
  findAll() {
    const service = new TasksService();
    return service.getAll();
  }

  @Get('search')
  async findByTitle(@Query('title') title: string) {
    const service = new TasksService();

    return service.findByTitle(title);
  }

  @Post('bulk-delete')
  async bulkDelete(@Body() tasks: any[]) {
    const service = new TasksService();
    return service.bulkDelete(tasks);
  }

  @Post('retry')
  async retry() {
    const service = new TasksService();
    await service.retryFailedTasks();
    return { message: 'retry started' };
  }

  @Post('complete')
  completeAll() {
    const service = new TasksService();
    return service.completeAll();
  }
}
