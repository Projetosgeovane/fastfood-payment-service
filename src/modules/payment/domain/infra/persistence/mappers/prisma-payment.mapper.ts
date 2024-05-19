import { Prisma, Payment as PrismaPayment } from '@prisma/client';
import { PaymentEntity } from '../../../enterprise/payment.entity';
import { UniqueEntityID } from '@enablers/core/entities';

export class PrismaPaymentMapper {
  static toDomain(raw: PrismaPayment): PaymentEntity {
    const payment = PaymentEntity.instance(
      {
        amount: raw.amount,
        orderId: raw.orderId,
        payerEmail: raw.payerEmail,
        payerId: raw.payerId,
        paymentDate: raw.paymentDate,
        paymentMethod: raw.paymentMethod,
        status: raw.status,
        transactionId: raw.transactionId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return payment;
  }

  static toPrisma(payment: PaymentEntity): Prisma.PaymentUncheckedCreateInput {
    return {
      id: payment.id.toValue(),
      orderId: payment.orderId,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      amount: payment.amount,
      transactionId: payment.transactionId,
      payerEmail: payment.payerEmail,
      payerId: payment.payerId,
      paymentDate: payment.paymentDate,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}
