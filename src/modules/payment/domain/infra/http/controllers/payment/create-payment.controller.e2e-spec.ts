import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { CreatePaymentUseCase } from 'src/modules/payment/domain/application/use-cases/payment/create-payment.use-case';
import request from 'supertest';
import { describe, expect, beforeAll, vi } from 'vitest';

describe('Create Network (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createPaymentUseCase: CreatePaymentUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    createPaymentUseCase = moduleRef.get(CreatePaymentUseCase);

    await app.init();
  });

  test('[POST] /fps/payment', async () => {
    const response = await request(app.getHttpServer())
      .post('/fps/payment')
      .send({
        id: '2314142141414141452',
        totalAmount: 100,
        paymentMethod: 'credit-card',
        products: [
          {
            title: 'string',
            quantity: 1,
            unit_price: 1,
          },
        ],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.value).toHaveProperty('paymentLink');

    const paymentOnDatabase = await prisma.payment.findUnique({
      where: {
        orderId: '2314142141414141452',
      },
    });

    expect(paymentOnDatabase.amount).toBe(100);
  });

  test('[POST] /fps/payment - NotFoundException', async () => {
    vi.spyOn(createPaymentUseCase, 'execute').mockImplementationOnce(() => {
      throw new BadRequestException();
    });

    const response = await request(app.getHttpServer())
      .post('/fps/payment')
      .send({
        id: '23141421414141414524',
        totalAmount: 100,
        paymentMethod: 'credit-card',
        products: [
          {
            title: 'string',
            quantity: 1,
            unit_price: 1,
          },
        ],
      });

    expect(response.statusCode).toBe(400);
  });
});
