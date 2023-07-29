import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateOrUpdateUserDto } from './dto/create-or-update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUser(@Query("email") email: string) {
    return this.usersService.getUser(email);
  }

  @Post()
  createUser(@Body(new ValidationPipe({ transform: true })) dto: CreateOrUpdateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post('/bulk')
  createUsers(@Body() data) {
    return this.usersService.createUsers(data);
  }
}
