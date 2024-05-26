import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HandleWebhookPaymentUseCase } from './handle-webhook-payment.use-case';
import { PaymentRepository } from '../../repositories/payment.repository';
import axios from 'axios';
import { HandleWebhookDTO } from '../../../infra/http/dtos/handle-webhook.dto';

vi.mock('axios');
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
};

describe('HandleWebhookPaymentUseCase', () => {
  let handleWebhookPaymentUseCase: HandleWebhookPaymentUseCase;
  let paymentRepository: PaymentRepository;

  beforeEach(() => {
    paymentRepository = {
      findByTransactionId: vi.fn(),
      save: vi.fn(),
    } as unknown as PaymentRepository;

    handleWebhookPaymentUseCase = new HandleWebhookPaymentUseCase(
      paymentRepository,
    );
  });

  it('should update payment details if payment exists', async () => {
    const mockPayment = {
      id: '123',
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      payerEmail: null,
      payerId: null,
    };

    const webhookDTO: HandleWebhookDTO = {
      id: '123',
      resource: 'http://example.com/resource',
    };

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        external_reference: 'order123',
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            status: 'approved',
            date_approved: '2021-09-30T00:00:00Z',
            payment_type: 'credit_card',
            collector_id: 'collector123',
            payer: {
              email: 'payer@example.com',
              id: 'payer123',
            },
          },
        ],
      },
    });

    (
      paymentRepository.findByTransactionId as unknown as vi.Mock
    ).mockResolvedValue(mockPayment);
    (paymentRepository.save as unknown as vi.Mock).mockResolvedValue(undefined);

    const result = await handleWebhookPaymentUseCase.execute(webhookDTO);

    expect(result.isSuccess()).toBe(true);
    expect(paymentRepository.findByTransactionId).toHaveBeenCalledWith(
      'order123',
    );
    expect(mockPayment.status).toBe('approved');
    expect(mockPayment.paymentDate).toEqual(new Date('2021-09-30T00:00:00Z'));
    expect(mockPayment.paymentMethod).toBe('credit_card');
    expect(mockPayment.transactionId).toBe('collector123');
    expect(mockPayment.payerEmail).toBe('payer@example.com');
    expect(mockPayment.payerId).toBe('payer123');
    expect(paymentRepository.save).toHaveBeenCalledWith(mockPayment);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      'https://d0ewo299u4.execute-api.us-east-1.amazonaws.com/dev/fos/order/order123',
      { status: 'approved' },
    );
  });

  it('should handle case where payment is not found', async () => {
    const webhookDTO: HandleWebhookDTO = {
      id: '123',
      resource: 'http://example.com/resource',
    };

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        external_reference: 'order123',
      },
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            status: 'approved',
            date_approved: '2021-09-30T00:00:00Z',
            payment_type: 'credit_card',
            collector_id: 'collector123',
            payer: {
              email: 'payer@example.com',
              id: 'payer123',
            },
          },
        ],
      },
    });

    (
      paymentRepository.findByTransactionId as unknown as vi.Mock
    ).mockResolvedValue(null);

    const result = await handleWebhookPaymentUseCase.execute(webhookDTO);

    expect(result.isSuccess()).toBe(true);
    expect(paymentRepository.findByTransactionId).toHaveBeenCalledWith(
      'order123',
    );
    expect(paymentRepository.save).not.toHaveBeenCalled();
  });
});
