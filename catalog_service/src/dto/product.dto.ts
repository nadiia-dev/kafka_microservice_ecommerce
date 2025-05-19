import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProduct {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  stock: number;
}

export class UpdateProduct {
  name?: string;

  description?: string;

  price?: number;

  @IsNumber()
  stock?: number;
}
