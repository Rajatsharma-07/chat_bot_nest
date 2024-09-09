import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatGptService } from './services/chatgpt.service';

@Module({
  imports: [HttpModule],
  providers: [ChatGptService],
  exports: [ChatGptService],
})
export class ChatGptModule {}
