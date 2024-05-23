import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'test/factories/make-in-memory-repositories.factory';
import { CreatePaymentUseCase } from './create-payment.use-case';

describe('HandleWebhookPaymentUseCase', () => {
  let inMemory: InMemoryRepositoriesProps;

  let sut: CreatePaymentUseCase;

  beforeEach(() => {
    inMemory = makeInMemoryRepositories();

    sut = new CreatePaymentUseCase(
      inMemory.PaymentRepository,
      inMemory.MercadoPagoRepository,
    );
  });

  it('should create a payment', async () => {
    const request = {
      orderId: '1',
      amount: 100,
      paymentMethod: 'credit_card',
      products: [
        {
          title: 'batata',
          quantity: 1,
          unit_price: 7,
        },
        {
          title: 'salada',
          quantity: 1,
          unit_price: 10,
        },
      ],
    };

    const result = (await sut.execute(request)) as any;

    expect(result.value.statusCode).toBe(201);
  });
});
