import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/domain/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async listAll(): Promise<Category[]> {
    try {
      return await this.categoryModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
