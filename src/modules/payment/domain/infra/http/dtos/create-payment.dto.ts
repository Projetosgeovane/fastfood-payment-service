import {
  IsString,
  IsNumber,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

interface ProductItem {
  title: string;
  quantity: number;
  unit_price: number;
}
export class CreatePaymentDTO {
  @IsUUID()
  id: string;

  @IsNumber()
  totalAmount: number;

  @IsString()
  @IsOptional()
  paymentMethod: string;

  @IsOptional()
  payerEmail: string;

  @IsOptional()
  payerId: string;

  @IsOptional()
  paymentDate: Date;

  @IsOptional()
  status: string;

  @IsOptional()
  transactionId: string;

  @IsArray()
  @ValidateNested({ each: true })
  products: ProductItem[];
}
