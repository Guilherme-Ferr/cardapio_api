import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ name: 'pass' })
  pass?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
