import { Either, success } from '@enablers/core/types';
import { PaymentEntity } from '../../../enterprise/payment.entity';
import { PaymentRepository } from '../../repositories/payment.repository';
import { Injectable } from '@nestjs/common';

interface FetchPaymentsUseCaseRequest {
  page: number;
}

type FetchPaymentsUseCaseResponse = Either<null, { payments: PaymentEntity[] }>;
@Injectable()
export class FetchPaymentsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({
    page,
  }: FetchPaymentsUseCaseRequest): Promise<FetchPaymentsUseCaseResponse> {
    const payments = await this.paymentRepository.findManyRecent({ page });

    return success({ payments });
  }
}
