import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/domain/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async listAll(): Promise<Product[]> {
    try {
      return await this.productModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
