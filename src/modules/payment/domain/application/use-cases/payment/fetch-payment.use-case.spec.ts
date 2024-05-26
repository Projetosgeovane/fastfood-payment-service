import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'test/factories/make-in-memory-repositories.factory';
import { makePayment } from 'test/factories/make-payment.factory';
import { FetchPaymentUseCase } from './fetch-payment.use-case';
describe('FetchNetworksUseCase', () => {
  let inMemory: InMemoryRepositoriesProps;

  let sut: FetchPaymentUseCase;

  beforeEach(() => {
    inMemory = makeInMemoryRepositories();

    sut = new FetchPaymentUseCase(inMemory.PaymentRepository);
  });

  it('should be able fetch all payments', async () => {
    const payment1 = makePayment();
    const payment2 = makePayment();
    const payment3 = makePayment();

    inMemory.PaymentRepository.items.push(payment1);
    inMemory.PaymentRepository.items.push(payment2);
    inMemory.PaymentRepository.items.push(payment3);

    const result = await sut.execute({ id: payment1.id.toValue() });

    expect(result.isSuccess()).toBe(true);
  });

  it('should return failure when payment is not found', async () => {
    const result = await sut.execute({ id: 'non-existent-id' });

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeNull();
  });
});
