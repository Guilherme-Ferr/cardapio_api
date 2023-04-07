import { Controller, Get, Headers } from '@nestjs/common';
import { Category } from 'src/domain/schemas/category.schema';
import { ProductService } from 'src/services/product.service';
import { validateTokenParams } from 'src/utils/validate-user-token';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll(
    @Headers('token') token: string,
  ): Promise<{ products: Category[] }> {
    await validateTokenParams(token);
    const products = await this.productService.listAll();
    return { products };
  }
}
