import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { ChatGptModule } from '../chatgpt/chatgpt.module';

@Module({
  imports: [ChatGptModule],
  providers: [SocketService],
})
export class SocketModule { }
