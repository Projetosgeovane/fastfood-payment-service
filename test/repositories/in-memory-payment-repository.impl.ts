import { InMemoryRepositoryImpl } from './in-memory-repository.impl';
import { PaymentEntity } from 'src/modules/payment/domain/enterprise/payment.entity';
import { PaymentRepository } from 'src/modules/payment/domain/application/repositories/payment.repository';

export class InMemoryPaymentRepositoryImpl
  extends InMemoryRepositoryImpl<PaymentEntity>
  implements PaymentRepository
{
  public items: PaymentEntity[] = [];
  async findByTransactionId(
    transactionId: string,
  ): Promise<PaymentEntity | null> {
    const item = this.items.find(
      (item) => (item as any).transactionId.toString() === transactionId,
    );
    if (!item) {
      return item;
    }
    return null;
  }
}
