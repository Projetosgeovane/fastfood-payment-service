import { UniqueEntityID } from '@enablers/core/entities';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import {
  PaymentEntity,
  PaymentEntityProps,
} from 'src/modules/payment/domain/enterprise/payment.entity';

export function makePayment(
  override: Partial<PaymentEntityProps> = {},
  id?: UniqueEntityID,
): PaymentEntity {
  const payment = PaymentEntity.instance(
    {
      orderId: randomUUID(),
      status: 'PENDING',
      amount: faker.number.int(),
      ...override,
    },
    id,
  );

  return payment;
}
