import { IsNotEmpty } from 'class-validator';

export class StockDto {
  @IsNotEmpty()
  items: string;

  @IsNotEmpty()
  productId: number;
}
