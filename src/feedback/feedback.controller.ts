import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('feedback')
export class FeedbackController {
  @Get(':id')
  create(@Param('id') id: string) {
    return `get ${id}`;
  }

  @Get()
  getAll() {
    return 'getAll';
  }
}
