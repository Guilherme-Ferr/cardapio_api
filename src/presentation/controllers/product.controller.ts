import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { Product } from 'src/domain/schemas/product.schema';
import { ProductService } from 'src/services/product.service';
import { validateUserIsAdmin } from 'src/utils/validate-user-token';
import { validateTokenParams } from 'src/utils/validate-user-token';
import { CreateProductRequest } from '../requests/authentication-request copy';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll(
    @Headers('token') token: string,
  ): Promise<{ products: Product[] }> {
    await validateTokenParams(token);
    const products = await this.productService.listAll();
    return { products };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: string,
    @Headers('token') token: string,
  ): Promise<{ product: Product }> {
    await validateTokenParams(token);
    const product = await this.productService.findOne(id);
    return { product };
  }

  @Post()
  async create(
    @Headers('token') token: string,
    @Body() data: CreateProductRequest,
  ): Promise<{ newProduct: Product }> {
    await validateUserIsAdmin(token);
    const newProduct = await this.productService.create(data);
    return { newProduct };
  }
}
