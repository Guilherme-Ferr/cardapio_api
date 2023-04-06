import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from './configs/constants';
import { User, UserSchema } from './domain/schemas/user.schema';
import { UserController } from './presentation/controllers/app.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
