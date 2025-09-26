import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true })
  userId: string;
  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  // userId: string;

  @Prop({ required: true })
  displayName: string;

  @Prop()
  gender: string;

  @Prop({ type: Date })
  birthday: Date;
  
  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;
  
  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop([String])
  interests: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);