import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Product } from 'src/domain/schemas/product.schema';
import { ProductService } from 'src/services/product.service';
import { validateUserIsAdmin } from 'src/utils/validate-user-token';
import { validateTokenParams } from 'src/utils/validate-user-token';
import { CreateUpdateProductRequest } from '../requests/create-update-product-request';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

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
  ): Promise<{ product: Product }> {
    await validateTokenParams(token);
    const product = await this.productService.findOne(id);
    return { product };
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
