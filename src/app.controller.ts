import { Controller, Get, Query } from '@nestjs/common';
import { Length } from 'class-validator';

class TestDto {
  @Length(6)
  test: string;
}

@Controller()
export class AppController {

  @Get('test')
  getTest(@Query() { test }: TestDto) {
    return { test };
  }
}
