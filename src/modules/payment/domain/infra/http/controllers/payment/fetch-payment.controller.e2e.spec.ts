import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import request from 'supertest';
import { PaymentFactory } from 'test/factories/make-payment.factory';

describe('FetchPaymentsByIdController', () => {
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
      .get('/fps/payment/id')
      .query({
        param: 'id',
      })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.payments).toHaveLength(2);

    const paymentOnDatabase = await prisma.payment.findMany();

    expect(paymentOnDatabase).toHaveLength(3);

    const response2 = await request(app.getHttpServer())
      .get('/fps/payment/id')
      .query({
        param: 'id',
      })
      .send();

    expect(response2.statusCode).toBe(200);
    expect(response2.body.payments).toHaveLength(0);

    const response3 = await request(app.getHttpServer())
      .get('/fps/payment/id')
      .query({
        param: '',
      })
      .send();

    expect(response3.statusCode).toBe(400);
  });
});
