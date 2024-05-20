import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import request from 'supertest';
import { PaymentFactory } from 'test/factories/make-payment.factory';

describe('FetchPaymentsController', () => {
  let app: INestApplication;
  let paymentFactory: PaymentFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PaymentFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    paymentFactory = moduleRef.get(PaymentFactory);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[GET] /fps/payment/id', async () => {
    await paymentFactory.makePrismaPayment({
      amount: faker.number.int(),
      orderId: randomUUID(),
      status: 'PENDING',
    });
    await paymentFactory.makePrismaPayment({
      amount: faker.number.int(),
      orderId: randomUUID(),
      status: 'PENDING',
    });
    await paymentFactory.makePrismaPayment({
      amount: faker.number.int(),
      orderId: randomUUID(),
      status: 'PENDING',
    });

    const response = await request(app.getHttpServer())
      .get('/fps/payment')
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.payments).toHaveLength(3);

    const paymentOnDatabase = await prisma.payment.findMany();

    expect(paymentOnDatabase).toHaveLength(3);
  });
});
