import { BaseRepository } from '@enablers/core/repositories';
import { PaymentEntity } from '../../enterprise/payment.entity';

export abstract class PaymentRepository extends BaseRepository<PaymentEntity> {
  abstract findByTransactionId(
    transactionId: string,
  ): Promise<PaymentEntity | null>;
}
