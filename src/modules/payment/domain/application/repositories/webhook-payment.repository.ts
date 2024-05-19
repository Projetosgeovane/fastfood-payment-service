export abstract class PaymentRepository<T> {
  abstract create(data: T): Promise<void>;
}
