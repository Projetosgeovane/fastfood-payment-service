import { Optional } from '@enablers/core/types';
import { Entity, UniqueEntityID } from '../../../../../libs/core/src/entities';

export interface PaymentEntityProps {
  orderId: string;
  status: string;
  amount: number;
  paymentMethod?: string | null;
  transactionId?: string | null;
  payerEmail?: string | null;
  payerId?: string | null;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class PaymentEntity extends Entity<PaymentEntityProps> {
  static instance(
    props: Optional<PaymentEntityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const payment = new PaymentEntity(
      {
        orderId: props.orderId ?? null,
        status: props.status ?? null,
        amount: props.amount ?? null,
        paymentMethod: props.paymentMethod ?? null,
        transactionId: props.transactionId ?? null,
        payerEmail: props.payerEmail ?? null,
        payerId: props.payerId ?? null,
        paymentDate: props.paymentDate ?? null,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
        ...props,
      },
      id,
    );

    return payment;
  }

  get orderId() {
    return this.props.orderId;
  }

  get paymentMethod() {
    return this.props.paymentMethod;
  }

  get status() {
    return this.props.status;
  }

  get amount() {
    return this.props.amount;
  }

  get transactionId() {
    return this.props.transactionId;
  }

  get payerEmail() {
    return this.props.payerEmail;
  }

  get payerId() {
    return this.props.payerId;
  }

  get paymentDate() {
    return this.props.paymentDate;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set status(status: string) {
    this.props.status = status;
  }

  set paymentDate(paymentDate: Date) {
    this.props.paymentDate = paymentDate;
  }

  set payerEmail(payerEmail: string) {
    this.props.payerEmail = payerEmail;
  }

  set paymentMethod(paymentMethod: string) {
    this.props.paymentMethod = paymentMethod;
  }

  set payerId(payerId: string) {
    this.props.payerId = payerId;
  }
}
