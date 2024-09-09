import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './modules/socket/socket.module';
import { ChatGptModule } from './modules/chatgpt/chatgpt.module';

@Module({
  imports: [SocketModule, ChatGptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
