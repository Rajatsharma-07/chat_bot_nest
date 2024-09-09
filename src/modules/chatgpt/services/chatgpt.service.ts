import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ChatGptService {
    private openai: OpenAI;

    constructor() {
        // Created the instance for OpenAI
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async getChatCompletion(messages: any[]) {
        try {
            // Here I am calling the https://api.openai.com/v1/completions API
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages,
            });
            // Right now I am getting error because I dont have available quota for sending requests to my openAI account
            return response; 
        } catch (error) {
            return error
            // uncomment the below line after having the legit openAi Api keys
            // throw new Error(`OpenAI API request failed: ${error.message}`);
        }
    }
}
