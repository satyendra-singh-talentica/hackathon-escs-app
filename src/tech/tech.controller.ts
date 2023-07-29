import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TechService } from './tech.service';
import { CreateOrUpdateTechDto } from './dto/create-or-update-tech.dto';

@Controller('/tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  getTech() {
    return this.techService.getTech();
  }

  @Post()
  createTech(@Body(ValidationPipe) dto: CreateOrUpdateTechDto) {
    return this.techService.createTech(dto);
  }

  @Post('/bulk')
  createTechs(@Body() data) {
    return this.techService.createTechs(data);
  }
}
