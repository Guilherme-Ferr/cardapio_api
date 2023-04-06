import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from './configs/constants';

@Module({
  imports: [MongooseModule.forRoot(DB_URI), MongooseModule.forFeature([])],
  controllers: [],
  providers: [],
})
export class AppModule {}
