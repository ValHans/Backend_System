import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatGateway } from './gateways/chat.gateway';
import { Message, MessageSchema } from './schemas/message.schema';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    // Membuat model Message tersedia untuk di-inject
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  // Mendaftarkan Controller, Service, dan Gateway
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}

// import { Module } from '@nestjs/common';
// import { ChatGateway } from './/gateways/chat.gateway';
// import { ChatService } from './chat.service';
// import { ChatController } from './chat.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Message, MessageSchema } from './schemas/message.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
//   ],
//   providers: [ChatGateway, ChatService],
//   controllers: [ChatController],
// })
// export class ChatModule {}