import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/customer/available (GET)', () => {
    return request(app.getHttpServer())
      .get('/customer/available')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('isAvailable');
        expect(res.body.isAvailable).toBe(true);
      });
  });

  it('/topics (GET)', () => {
    return request(app.getHttpServer())
      .get('/topics')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        const footballTopic = res.body.find(
          (topic) => topic.name === 'Football',
        );
        expect(footballTopic).toBeDefined();
        expect(footballTopic).toHaveProperty('suggestions');
        expect(footballTopic.suggestions.length).toBeGreaterThan(0);
      });
  });
});
