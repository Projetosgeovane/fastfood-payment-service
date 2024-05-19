import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../../repositories/payment.repository';
import { PaymentEntity } from '../../../enterprise/payment.entity';
import { Either, failure, success } from '@enablers/core/types';

interface FetchPaymentByIdUseCaseRequest {
  id: string;
}

type FetchPaymentByIdUseCaseResponse = Either<
  null,
  {
    payment: PaymentEntity;
  }
>;
@Injectable()
export class FetchPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute({
    id,
  }: FetchPaymentByIdUseCaseRequest): Promise<FetchPaymentByIdUseCaseResponse> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      return failure(null);
    }

    return success({ payment });
  }
}
