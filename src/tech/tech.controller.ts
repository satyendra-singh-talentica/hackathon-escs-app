import { Body, Controller, Get, Post } from '@nestjs/common';
import { TechService } from './tech.service';

@Controller('/tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  getTech() {
    return this.techService.getTech();
  }

  @Post()
  createTech(@Body() dto) {
    return this.techService.createTech(dto);
  }
}
