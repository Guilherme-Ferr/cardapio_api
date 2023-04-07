import { Controller, Get, Headers } from '@nestjs/common';
import { Category } from 'src/domain/schemas/category.schema';
import { CategoryService } from 'src/services/category.service';
import { validateUserIsAdmin } from 'src/utils/validate-user-token';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async listAll(
    @Headers('token') token: string,
  ): Promise<{ categories: Category[] }> {
    await validateUserIsAdmin(token);
    const categories = await this.categoryService.listAll();
    return { categories };
  }
}
