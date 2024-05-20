import { ResourceExistsError } from '@enablers/core/errors';
import { PaymentEntity } from '../../../enterprise/payment.entity';
import { Injectable } from '@nestjs/common';
import { Either, success } from '@enablers/core/types';
import { PaymentRepository } from '../../repositories/payment.repository';
import { MercadoPagoRepository } from '../../repositories/mercado-pago.repository';

interface ProductItem {
  title: string;
  quantity: number;
  unit_price: number;
}

interface PaymentRequest {
  orderId: string;
  amount: number;
  products: ProductItem[];
  paymentMethod: string;
}

type PaymentResponse = Either<ResourceExistsError, object>;
@Injectable()
export class CreatePaymentUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly mercadoPagoRepository: MercadoPagoRepository,
  ) {}

  async execute(dto: PaymentRequest): Promise<PaymentResponse> {
    const { amount, orderId, products } = dto;

    const paymentPreference =
      await this.mercadoPagoRepository.createPaymentPreference({
        amount,
        orderId,
        products,
      });

    const payment = PaymentEntity.instance({
      amount,
      orderId,
      status: 'PENDING',
    });

    await this.paymentRepository.create(payment);

    return success({
      statusCode: 201,
      paymentLink: paymentPreference,
    });
  }
}
