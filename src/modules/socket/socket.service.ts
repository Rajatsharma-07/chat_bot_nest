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
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
    // Injecting the chatgptservice in this service
    constructor(private readonly chatgptService: ChatGptService) { }
    @WebSocketServer()
    server: Server;

    // This will handle the connection of client
    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }

    // This will disconnect the client
    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    // This will be called when client will emit message on 'message' stream
    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: string[]) {
        console.log('Message received from client:', payload);
        // calling the chatgptservice to fetch the response and also sending all the previous messages to openai to give better suggestion
        this.chatgptService.getChatCompletion(payload)
            .then((res) => {
                let response = res;
                // if I get an error then will send res.error.message to client
                // if (res.error.message) {
                //     response = res.error.message;
                // }else{
                    // else will send the message
                    this.server.emit('message', response);
                // }
                return;
            })
            .catch((err) => {
                // if (res.error.message) {
                        // response = res.error.message;
                    this.server.emit('message', err.error.message);
                return;
            });

    }
}
