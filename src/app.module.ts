// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';


// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // Membuat config module tersedia secara global
//     }),
//     MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/youapp_database'),
//     AuthModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Membuat config module tersedia secara global
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UserModule,
    ProfileModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}