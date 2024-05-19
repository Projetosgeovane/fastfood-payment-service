import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

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
}
