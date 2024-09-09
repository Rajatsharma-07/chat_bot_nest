import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ChatGptService } from '../chatgpt/services/chatgpt.service';
dotenv.config();

@WebSocketGateway({
    cors: {
        origin: [process.env.CLIENT_DOMAIN || 'http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatgptService: ChatGptService) { }
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: string[]) {
        console.log('Message received from client:', payload);
        this.chatgptService.getChatCompletion([payload])
            .then((res) => {
                let response = res;
                if(res.error.message){
                    response = res.error.message;
                }
                this.server.emit('message', response);
                return;
            })
            .catch((err) => {
                this.server.emit('message', err.error.message);
                return;
            });

    }
}
