import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose'; // <-- Impor 'Types' dari mongoose
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(data: {
    senderId: string;
    receiverId: string;
    message: string;
  }): Promise<Message> {
    const newMessage = new this.messageModel(data);
    return newMessage.save();
  }

  async getMessages(userId1: string, userId2: string): Promise<Message[]> {
    // Konversi string ID menjadi ObjectId sebelum query
    const userObjectId1 = new Types.ObjectId(userId1);
    const userObjectId2 = new Types.ObjectId(userId2);

    return this.messageModel
      .find({
        $or: [
          { senderId: userObjectId1, receiverId: userObjectId2 },
          { senderId: userObjectId2, receiverId: userObjectId1 },
        ],
      })
      .sort({ createdAt: 'asc' })
      .exec();
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Message, MessageDocument } from './schemas/message.schema';

// @Injectable()
// export class ChatService {
//   constructor(
//     @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
//   ) {}

//   async createMessage(data: { senderId: string; receiverId: string; message: string }): Promise<Message> {
//     const newMessage = new this.messageModel(data);
//     return newMessage.save();
//   }

//   async getMessages(userId1: string, userId2: string): Promise<Message[]> {
//     return this.messageModel.find({
//       $or: [
//         { senderId: userId1, receiverId: userId2 },
//         { senderId: userId2, receiverId: userId1 },
//       ],
//     }).sort({ timestamp: 'asc' }).exec();
//   }
// }