import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';
import { ChatGPTPromptDto } from './dto/chatgpt-prompt.dto';

@Controller('/chatgpt')
export class ChatGPTController {
  constructor(private readonly chatgptService: ChatGPTService) {}

  @Post()
  createGPTPrompt(@Body(ValidationPipe) dto: ChatGPTPromptDto) {
    return this.chatgptService.createGPTPrompt(dto);
  }
}
