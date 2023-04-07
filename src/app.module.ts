import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from './configs/constants';
import { Category, CategorySchema } from './domain/schemas/category.schema';
import { User, UserSchema } from './domain/schemas/user.schema';
import { CategoryController } from './presentation/controllers/category.controller';
import { UserController } from './presentation/controllers/user.controller';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { ProductController } from './presentation/controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [UserController, CategoryController, ProductController],
  providers: [UserService, CategoryService, ProductService],
})
export class AppModule {}
