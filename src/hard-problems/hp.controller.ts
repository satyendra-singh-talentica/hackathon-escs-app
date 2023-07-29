import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { HpsService } from './hp.service';
import { CreateOrUpdateHPDto } from './dto/create-or-update-hp.dto';

@Controller('/hps')
export class HpsController {
  constructor(private readonly hpsService: HpsService) {}

  @Get()
  getHps(@Query() dto) {
    return this.hpsService.getHps(dto);
  }

  @Get('/:id')
  getHp(@Param('id') id: number) {
    return this.hpsService.getHp(id);
  }

  @Post()
  createHp(@Body(new ValidationPipe({ transform: true })) dto: CreateOrUpdateHPDto) {
    return this.hpsService.createHp(dto);
  }
}
