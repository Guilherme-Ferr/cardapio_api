import { Controller, Get, Headers, Param } from '@nestjs/common';
import { Product } from 'src/domain/schemas/product.schema';
import { ProductService } from 'src/services/product.service';
import { validateTokenParams } from 'src/utils/validate-user-token';

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
}
