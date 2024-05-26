import {
  BadRequestException,
  INestApplication,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { EditPaymentUseCase } from 'src/modules/payment/domain/application/use-cases/payment/edit-payment.use-case';
import request from 'supertest';
import { PaymentFactory } from 'test/factories/make-payment.factory';
import { describe, it, expect, beforeAll, vi } from 'vitest';

describe('Edit Device Type (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let editPaymentUseCase: EditPaymentUseCase;
  let paymentFactory: PaymentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PaymentFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    editPaymentUseCase = moduleRef.get(EditPaymentUseCase);
    paymentFactory = moduleRef.get(PaymentFactory);

    await app.init();
  });

  test('[PUT] /payment', async () => {
    const payment = await paymentFactory.makePrismaPayment({
      amount: 100,
      status: 'PENDING',
    });

    const response = await request(app.getHttpServer())
      .put(`/fps/payment/${payment.id.toValue()}`)
      .send({
        status: 'approved',
      });

    expect(response.statusCode).toBe(204);

    const paymentOnDatabase = await prisma.payment.findUnique({
      where: {
        id: payment.id.toValue(),
      },
    });

    expect(paymentOnDatabase).toBeTruthy();
  });

  it('[PUT] /fps/payment/:paymentId - Success', async () => {
    const payment = await paymentFactory.makePrismaPayment({
      amount: 100,
      status: 'PENDING',
    });

    const response = await request(app.getHttpServer())
      .put(`/fps/payment/${payment.id.toValue()}`)
      .send({
        status: 'approved',
      });

    expect(response.statusCode).toBe(204);

    const paymentOnDatabase = await prisma.payment.findUnique({
      where: {
        id: payment.id.toValue(),
      },
    });

    expect(paymentOnDatabase).toBeTruthy();
    expect(paymentOnDatabase.status).toBe('approved');
  });

  it('[PUT] /fps/payment/:paymentId - NotFoundException', async () => {
    vi.spyOn(editPaymentUseCase, 'execute').mockImplementationOnce(() => {
      throw new NotFoundException('Payment not found');
    });

    const response = await request(app.getHttpServer())
      .put('/fps/payment/nonexistent-id')
      .send({
        status: 'approved',
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Payment not found');
  });

  it('[PUT] /fps/payment/:paymentId - BadRequestException', async () => {
    vi.spyOn(editPaymentUseCase, 'execute').mockImplementationOnce(() => {
      throw new BadRequestException();
    });

    const response = await request(app.getHttpServer())
      .put(`/fps/payment/nonexistent-id`)
      .send({
        status: 'approved',
      });

    expect(response.statusCode).toBe(400);
  });

  it('[PUT] /fps/payment/:paymentId - Custom Error', async () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'CustomError';
      }
    }

    vi.spyOn(editPaymentUseCase, 'execute').mockImplementationOnce(() => {
      throw new CustomError('Custom Error occurred');
    });

    const response = await request(app.getHttpServer())
      .put(`/fps/payment/nonexistent-id`)
      .send({
        status: 'approved',
      });

    expect(response.statusCode).toBe(500);
  });

  it('[PUT] /fps/payment/:paymentId - Invalid Status', async () => {
    const payment = await paymentFactory.makePrismaPayment({
      amount: 100,
      status: 'PENDING',
    });

    const response = await request(app.getHttpServer())
      .put(`/fps/payment/${payment.id.toValue()}`)
      .send({
        status: 'invalid-status',
      });

    expect(response.statusCode).toBe(204);
  });
});
