import { PaymentEntity } from '../../../enterprise/payment.entity';

export class PaymentsPresenter {
  static toHTTP(payment: PaymentEntity) {
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
