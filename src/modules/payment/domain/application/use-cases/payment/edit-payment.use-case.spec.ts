import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'test/factories/make-in-memory-repositories.factory';
import { EditPaymentUseCase } from './edit-payment.use-case';
import { makePayment } from 'test/factories/make-payment.factory';

describe('EditPaymentUseCase', () => {
  let inMemory: InMemoryRepositoriesProps;

  let sut: EditPaymentUseCase;

  beforeEach(() => {
    inMemory = makeInMemoryRepositories();

    sut = new EditPaymentUseCase(inMemory.PaymentRepository);
  });

  it('should create a payment', async () => {
    const payment = makePayment();

    inMemory.PaymentRepository.items.push(payment);

    const request = {
      id: payment.id.toValue(),
      status: 'approved',
    };

    const result = (await sut.execute(request)) as any;

    console.log(result);

    expect(inMemory.PaymentRepository.items[0].status).toBe('approved');
    expect(inMemory.PaymentRepository.items[0].id.toValue()).toBe(
      payment.id.toValue(),
    );
    expect(result.isSuccess()).toBe(true);
  });
});
