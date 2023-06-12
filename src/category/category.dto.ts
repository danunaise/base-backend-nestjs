import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;
}
