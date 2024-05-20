import { UniqueEntityID } from '@enablers/core/entities';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import {
  PaymentEntity,
  PaymentEntityProps,
} from 'src/modules/payment/domain/enterprise/payment.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { PrismaPaymentMapper } from 'src/modules/payment/domain/infra/persistence/mappers/prisma-payment.mapper';

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

@Injectable()
export class PaymentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPayment(data: Partial<PaymentEntityProps> = {}) {
    const payment = makePayment(data);

    await this.prisma.payment.create({
      data: PrismaPaymentMapper.toPrisma(payment),
    });

    return payment;
  }
}
