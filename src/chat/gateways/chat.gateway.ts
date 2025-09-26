import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(userId);
      console.log(`[CONNECTION] Client ${client.id} joined room: ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`[CONNECTION] Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: Socket,
    payload: { senderId: string; receiverId: string; message: string },
  ): Promise<void> {
    // 1. Simpan pesan ke database melalui service
    const createdMessage = await this.chatService.createMessage(payload);

    // 2. Kirim pesan hanya ke room milik penerima
    this.server
      .to(payload.receiverId)
      .emit('receiveMessage', createdMessage);
  }
}
