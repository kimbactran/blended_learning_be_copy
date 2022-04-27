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

    it('Register with address', () => {
        const req = request(app.getHttpServer())
            .post('/auth/register')
            .send({
                address: 'asc81234jk232dnjsdfy7124',
                username: 'user12',
                logo: 'string.logo',
                background_banner: 'string.bg',
                bio: 'bio acsad',
            })
            .expect(200);

        return req;
    });

    it('Login with registered address', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                address: 'asc81234jk232dnjsdfy7124',
            })
            .expect(200);

        accessToken = response.body.token.accessToken;
    });

    // it('Get current logged in address', () => {
    //     const session = getNamespace(sessionName);

    //     session.run(async () => {
    //         const res = await request(app.getHttpServer())
    //             .get('/auth/me')
    //             .set('Authorization', 'Bearer' + accessToken)
    //             .expect(200);

    //         return res;
    //     });
    // });

    it('Update contact', () => {
        const session = getNamespace(sessionName);

        session.run(async () => {
            const req = request(app.getHttpServer())
                .put('/users/contact')
                .set('Authorization', 'Bearer ' + accessToken)
                .send({
                    twitter: '2323',
                    facebook: 'use23232r12',
                    email: 'string.logo',
                    behance: 'string.bg',
                })
                .expect(202);

            return req;
        });
    });

    afterAll(() => app.close());
});
