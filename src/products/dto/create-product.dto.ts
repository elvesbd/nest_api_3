import { MaxLength, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
