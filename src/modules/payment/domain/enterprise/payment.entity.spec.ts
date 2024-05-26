import { describe, it, expect } from 'vitest';
import { PaymentEntity, PaymentEntityProps } from './payment.entity';

describe('PaymentEntity', () => {
  it('should create a payment entity with all properties', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      paymentMethod: 'credit_card',
      transactionId: 'txn123',
      payerEmail: 'payer@example.com',
      payerId: 'payer123',
      paymentDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);

    expect(payment).toBeInstanceOf(PaymentEntity);
    expect(payment.orderId).toBe(props.orderId);
    expect(payment.status).toBe(props.status);
    expect(payment.amount).toBe(props.amount);
    expect(payment.paymentMethod).toBe(props.paymentMethod);
    expect(payment.transactionId).toBe(props.transactionId);
    expect(payment.payerEmail).toBe(props.payerEmail);
    expect(payment.payerId).toBe(props.payerId);
    expect(payment.paymentDate).toBe(props.paymentDate);
    expect(payment.createdAt).toBe(props.createdAt);
    expect(payment.updatedAt).toBe(props.updatedAt);
  });

  it('should create a payment entity with only required properties', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);

    expect(payment).toBeInstanceOf(PaymentEntity);
    expect(payment.orderId).toBe(props.orderId);
    expect(payment.status).toBe(props.status);
    expect(payment.amount).toBe(props.amount);
    expect(payment.paymentMethod).toBeNull();
    expect(payment.transactionId).toBeNull();
    expect(payment.payerEmail).toBeNull();
    expect(payment.payerId).toBeNull();
    expect(payment.paymentDate).toBeNull();
    expect(payment.createdAt).toBeInstanceOf(Date);
    expect(payment.updatedAt).toBeNull();
  });

  it('should create a payment entity with some optional properties', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      paymentMethod: 'credit_card',
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);

    expect(payment).toBeInstanceOf(PaymentEntity);
    expect(payment.orderId).toBe(props.orderId);
    expect(payment.status).toBe(props.status);
    expect(payment.amount).toBe(props.amount);
    expect(payment.paymentMethod).toBe(props.paymentMethod);
    expect(payment.transactionId).toBeNull();
    expect(payment.payerEmail).toBeNull();
    expect(payment.payerId).toBeNull();
    expect(payment.paymentDate).toBeNull();
    expect(payment.createdAt).toBeInstanceOf(Date);
    expect(payment.updatedAt).toBeNull();
  });

  it('should create a payment entity with null optional properties', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      paymentMethod: null,
      transactionId: null,
      payerEmail: null,
      payerId: null,
      paymentDate: null,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);

    expect(payment).toBeInstanceOf(PaymentEntity);
    expect(payment.orderId).toBe(props.orderId);
    expect(payment.status).toBe(props.status);
    expect(payment.amount).toBe(props.amount);
    expect(payment.paymentMethod).toBeNull();
    expect(payment.transactionId).toBeNull();
    expect(payment.payerEmail).toBeNull();
    expect(payment.payerId).toBeNull();
    expect(payment.paymentDate).toBeNull();
    expect(payment.createdAt).toBeInstanceOf(Date);
    expect(payment.updatedAt).toBeNull();
  });

  // Add more tests for the setters to ensure complete coverage
  it('should allow updating the status', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);
    payment.status = 'approved';

    expect(payment.status).toBe('approved');
  });

  it('should allow updating the payment date', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);
    const paymentDate = new Date();
    payment.paymentDate = paymentDate;

    expect(payment.paymentDate).toBe(paymentDate);
  });

  it('should allow updating the payer email', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);
    const payerEmail = 'payer@example.com';
    payment.payerEmail = payerEmail;

    expect(payment.payerEmail).toBe(payerEmail);
  });

  it('should allow updating the payment method', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);
    const paymentMethod = 'credit_card';
    payment.paymentMethod = paymentMethod;

    expect(payment.paymentMethod).toBe(paymentMethod);
  });

  it('should allow updating the payer ID', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);
    const payerId = 'payer123';
    payment.payerId = payerId;

    expect(payment.payerId).toBe(payerId);
  });

  it('should allow updating the transaction ID', () => {
    const props: PaymentEntityProps = {
      orderId: 'order123',
      status: 'pending',
      amount: 100,
      createdAt: new Date(),
    };

    const payment = PaymentEntity.instance(props);
    const transactionId = 'txn123';
    payment.transactionId = transactionId;

    expect(payment.transactionId).toBe(transactionId);
  });
});
