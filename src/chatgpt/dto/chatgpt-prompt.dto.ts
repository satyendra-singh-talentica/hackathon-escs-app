import { IsNotEmpty, IsString } from 'class-validator';

export class ChatGPTPromptDto {

    @IsNotEmpty()
    @IsString()
    prompt: string;
}