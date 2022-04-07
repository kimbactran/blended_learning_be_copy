import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
    initializeTransactionalContext();
    let app: NestExpressApplication;
    let accessToken: string;

    beforeAll(async () => {
        // const moduleFixture = await Test.createTestingModule({
        //     imports: [AppModule],
        // }).compile();
        app = await NestFactory.create<NestExpressApplication>(
            AppModule,
            new ExpressAdapter(),
            { cors: true },
        );
        await app.init();
    });

    it('/auth/register (POST)', () => {
        const req = request(app.getHttpServer())
            .post('/auth/register')
            .field('firstName', 'John')
            .field('lastName', 'Smith')
            .field('email', 'john@smith.com')
            .field('password', 'password')
            // .send({
            //     firstName: 'John',
            //     lastName: 'Smith',
            //     email: 'john@smith.com',
            //     password: 'password',
            // })
            .expect(200);

        return req;
    });

    it('/auth/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'john@smith.com',
                password: 'password',
            })
            .expect(200);

        accessToken = response.body.token.accessToken;
    });

    it('/v1/auth/me (GET)', () =>
        request(app.getHttpServer())
            .get('/auth/me')
            .set({ Authorization: `Bearer ${accessToken}` })
            .expect(200));

    afterAll(() => app.close());
});
