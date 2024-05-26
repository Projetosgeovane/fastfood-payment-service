import { INestApplication, BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { HandleWebhookPaymentUseCase } from 'src/modules/payment/domain/application/use-cases/payment/handle-webhook-payment.use-case';
import { describe, it, expect, beforeAll, vi } from 'vitest';

describe('Handle Webhook Payment (e2e)', () => {
  let app: INestApplication;
  let handleWebhookPaymentUseCase: HandleWebhookPaymentUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    handleWebhookPaymentUseCase = moduleRef.get(HandleWebhookPaymentUseCase);
  });

  it('[POST] /fps/webhook/payment - Success', async () => {
    const webhookPayload = {
      // Dados de exemplo do payload do webhook
      id: '123456789',
      type: 'payment',
      data: { id: '987654321' },
    };

    const response = await request(app.getHttpServer())
      .post('/fps/webhook/payment')
      .send(webhookPayload);

    expect(response.statusCode).toBe(500);
  });

  it('[POST] /fps/webhook/payment - BadRequestException', async () => {
    const webhookPayload = {
      id: '123456789',
      type: 'payment',
      data: { id: '987654321' },
    };

    vi.spyOn(handleWebhookPaymentUseCase, 'execute').mockImplementationOnce(
      () => {
        throw new BadRequestException();
      },
    );

    const response = await request(app.getHttpServer())
      .post('/fps/webhook/payment')
      .send(webhookPayload);

    expect(response.statusCode).toBe(400);
  });
});
