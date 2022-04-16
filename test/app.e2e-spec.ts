/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

import { AppModule } from '../src/app.module';

const createNamespace = require('cls-hooked').createNamespace;
const getNamespace = require('cls-hooked').getNamespace;

const sessionName = 'test';

createNamespace(sessionName);

describe('AuthController (e2e)', () => {
    initializeTransactionalContext();
    let app: INestApplication;
    let accessToken: string;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        // app = await moduleFixture.create<NestExpressApplication>(
        //     AppModule,
        //     new ExpressAdapter(),
        //     { cors: true },
        // );

        app = moduleFixture.createNestApplication(new ExpressAdapter());
        await app.init();
    });

    it('/auth/register (POST)', () => {
        const req = request(app.getHttpServer())
            .post('/auth/register')
            // .field('firstName', 'John')
            // .field('lastName', 'Smith')
            // .field('email', 'john@smith.com')
            // .field('password', 'password')
            .send({
                address: 'asc81234jkdnjsdfy7124',
                username: 'user1',
                logo: 'string.logo',
                background_banner: 'string.bg',
                bio: 'bio acsad',
            })
            .expect(200);

        return req;
    });

    it('/auth/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                address: 'asc81234jkdnjsdfy7124',
            })
            .expect(200);

        accessToken = response.body.token.accessToken;
    });

    it('/v1/auth/me (GET)', () => {
        const session = getNamespace(sessionName);

        session.run(async () => {
            const res = await request(app.getHttpServer())
                .get('/auth/me')
                .set('Authorization', 'Bearer' + accessToken)
                .expect(200);

            return res;
        });
    });

    afterAll(() => app.close());
});
