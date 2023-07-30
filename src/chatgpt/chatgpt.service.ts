import { Injectable } from '@nestjs/common';
import { ChatGPTPromptDto } from './dto/chatgpt-prompt.dto';
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class ChatGPTService {

    openai = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    }));

    async createGPTPrompt(dto: ChatGPTPromptDto) {
        try {
            const resp = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: dto.prompt }],
            });
            return resp.data.choices[0].message.content
        } catch(e) {
            // nothing
        }
    }
}
