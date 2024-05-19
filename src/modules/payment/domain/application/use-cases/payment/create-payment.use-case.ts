import { ResourceExistsError } from '@enablers/core/errors';
import { PaymentEntity } from '../../../enterprise/payment.entity';
import { Injectable } from '@nestjs/common';
import { Either, success } from '@enablers/core/types';
import { PaymentRepository } from '../../repositories/payment.repository';
import { MercadoPagoRepository } from '../../repositories/mercado-pago.repository';
interface PaymentRequest {
  orderId: string;
  amount: number;
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
    const { orderId, amount } = dto;

    // const paymentAlreadyExists =
    //   await this.paymentRepository.findByTransactionId(transactionId);

    // if (paymentAlreadyExists) {
    //   return failure(new ResourceExistsError('Name already exists'));
    // }

    const paymentPreference =
      await this.mercadoPagoRepository.createPaymentPreference({
        orderId,
        amount,
      });

    const payment = PaymentEntity.instance({
      amount,
      orderId,
      status: 'PENDING',
    });

    await this.paymentRepository.create(payment);

    return success({
      statusCode: 201,
      data: paymentPreference,
    });
  }
}
