import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGPTController } from './chatgpt.controller';
import { ChatGPTService } from './chatgpt.service';

@Module({
  controllers: [ChatGPTController],
  providers: [ChatGPTService],
  exports: [ChatGPTService]
})
export class ChatGPTModule { }