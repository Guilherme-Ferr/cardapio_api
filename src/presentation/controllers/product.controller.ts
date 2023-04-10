import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  Product,
  ProductWithCategories,
} from 'src/domain/schemas/product.schema';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import {
  validateTokenParams,
  validateUserIsAdmin,
} from 'src/utils/validate-user-token';
import { CreateUpdateProductRequest } from '../requests/create-update-product-request';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Get()
  @HttpCode(200)
  async listAll(
    @Headers('token') token: string,
  ): Promise<{ products: Product[] }> {
    await validateTokenParams(token);
    const products = await this.productService.listAll();
    return { products };
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(
    @Param('id') id: string,
    @Headers('token') token: string,
  ): Promise<{ product: ProductWithCategories }> {
    await validateTokenParams(token);
    const productFound = await this.productService.findOne(id);
    const categories = await this.categoryService.listById(
      productFound?.categoriesIds,
    );
    return {
      product: {
        _id: productFound?.id,
        name: productFound?.name,
        qty: productFound?.qty,
        price: productFound?.price,
        categories,
      },
    };
  }

  @Post()
  @HttpCode(201)
  async create(
    @Headers('token') token: string,
    @Body() data: CreateUpdateProductRequest,
  ): Promise<{ newProduct: Product }> {
    await validateUserIsAdmin(token);
    const newProduct = await this.productService.create(data);
    return { newProduct };
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Headers('token') token: string,
    @Body() requestBody: CreateUpdateProductRequest,
  ): Promise<void> {
    await validateUserIsAdmin(token);
    await this.productService.update(id, requestBody);
  }

  @Delete('/:id')
  @HttpCode(204)
  async delete(
    @Param('id') id: string,
    @Headers('token') token: string,
  ): Promise<void> {
    await validateUserIsAdmin(token);
    await this.productService.delete(id);
  }
}
