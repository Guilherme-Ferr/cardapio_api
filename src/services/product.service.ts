import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/domain/schemas/product.schema';
import { CreateUpdateProductRequest } from 'src/presentation/requests/create-update-product-request';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async listAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });
    if (!product) throw new NotFoundException('Product not found!');
    return product;
  }

  async create(data: CreateUpdateProductRequest): Promise<Product> {
    const productExists = await this.productModel.findOne({ name: data?.name });
    if (productExists) throw new ConflictException('Product already exists!');
    else {
      const newProduct = await this.productModel.create(data);
      return newProduct;
    }
  }

  async update(
    productId: string,
    productData: CreateUpdateProductRequest,
  ): Promise<void> {
    const productExists = await this.productModel.findOne({ _id: productId });
    if (!productExists) throw new NotFoundException('Product not found!');
    else {
      await this.productModel.updateOne(
        { _id: productId },
        { $set: productData },
      );
    }
  }

  async delete(productId: string): Promise<void> {
    const productExists = await this.productModel.findOne({ _id: productId });
    if (!productExists) throw new NotFoundException('Product not found!');
    else {
      await this.productModel.deleteOne({ _id: productId });
    }
  }
}
