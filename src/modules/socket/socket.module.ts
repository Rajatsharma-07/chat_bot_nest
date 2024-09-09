import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatGptModule } from '../chatgpt/chatgpt.module';

@Module({
    imports: [ChatGptModule],
  providers: [ChatGateway],
})
export class SocketModule { }
