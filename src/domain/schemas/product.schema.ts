import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  qty: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
