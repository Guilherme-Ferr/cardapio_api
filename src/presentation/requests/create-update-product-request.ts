import { IsNotEmpty, Length } from 'class-validator';

export class CreateUpdateProductRequest {
  @IsNotEmpty({
    message: 'The name should not be empty',
  })
  @Length(1, 255)
  name: string;

  @IsNotEmpty({
    message: 'The quantity should not be empty',
  })
  @Length(1, 255)
  qty: number;

  @IsNotEmpty({
    message: 'The price should not be empty',
  })
  @Length(1, 255)
  price: number;

  @IsNotEmpty({
    message: 'The category id list should not be empty',
  })
  categoriesIds: string[];
}
