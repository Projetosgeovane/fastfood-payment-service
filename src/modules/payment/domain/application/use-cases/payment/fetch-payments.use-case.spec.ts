import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'test/factories/make-in-memory-repositories.factory';
import { FetchPaymentsUseCase } from './fetch-payments.use-case';
import { makePayment } from 'test/factories/make-payment.factory';
describe('FetchNetworksUseCase', () => {
  let inMemory: InMemoryRepositoriesProps;

  let sut: FetchPaymentsUseCase;

  beforeEach(() => {
    inMemory = makeInMemoryRepositories();

    sut = new FetchPaymentsUseCase(inMemory.PaymentRepository);
  });

  it('should be able fetch all payments', async () => {
    const payment1 = makePayment();
    const payment2 = makePayment();
    const payment3 = makePayment();

    inMemory.PaymentRepository.items.push(payment1);
    inMemory.PaymentRepository.items.push(payment2);
    inMemory.PaymentRepository.items.push(payment3);

    const result = await sut.execute({ page: 1 });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.payments).toHaveLength(3);
  });
});
