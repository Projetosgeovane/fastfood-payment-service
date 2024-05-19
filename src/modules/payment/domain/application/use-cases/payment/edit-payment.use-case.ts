import { ResourceNotFoundError } from 'libs/core/src/errors';
import { Injectable } from '@nestjs/common';
import { Either, failure, success } from 'libs/core/src/types';
import { PaymentRepository } from '../../repositories/payment.repository';

interface EditPaymentUseCaseRequest {
  id: string;
  status: string;
}

type EditPaymentUseCaseResponse = Either<ResourceNotFoundError, object>;
@Injectable()
export class EditPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute({
    id,
    status,
  }: EditPaymentUseCaseRequest): Promise<EditPaymentUseCaseResponse> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      return failure(new ResourceNotFoundError('Payment not found'));
    }

    payment.status = status;

    await this.paymentRepository.save(payment);

    return success({});
  }
}
