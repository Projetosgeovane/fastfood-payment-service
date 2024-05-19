import { InMemoryMercadoPagoRepositoryImpl } from 'test/repositories/in-memory-mercado-pago-repository.impl';
import { InMemoryPaymentRepositoryImpl } from 'test/repositories/in-memory-payment-repository.impl';

export interface InMemoryRepositoriesProps {
  MercadoPagoRepository: InMemoryMercadoPagoRepositoryImpl;
  PaymentRepository: InMemoryPaymentRepositoryImpl;
}

export function makeInMemoryRepositories(): InMemoryRepositoriesProps {
  const inMemoryMercadoPagoRepositoryImpl =
    new InMemoryMercadoPagoRepositoryImpl();
  const inMemoryPaymentRepositoryImpl = new InMemoryPaymentRepositoryImpl();

  return {
    MercadoPagoRepository: inMemoryMercadoPagoRepositoryImpl,
    PaymentRepository: inMemoryPaymentRepositoryImpl,
  };
}
