import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

// @Module({
//   imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
//   providers: [UserService],
//   exports: [UserService],
// })
// export class UserModule {}

