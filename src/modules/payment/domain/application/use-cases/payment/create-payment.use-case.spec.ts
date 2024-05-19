import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'test/factories/make-in-memory-repositories.factory';
import { CreatePaymentUseCase } from './create-payment.use-case';

describe('CreatePaymentUseCase', () => {
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
    const dto = {
      orderId: '1',
      amount: 100,
      paymentMethod: 'credit_card',
    };

    const result = (await sut.execute(dto)) as any;

    expect(result.value.statusCode).toBe(201);
  });
});
