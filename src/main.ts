/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ClassSerializerInterceptor,
    HttpStatus,
    UnprocessableEntityException,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { middleware as expressCtx } from 'express-ctx';
// import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/bad-request.filter';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { setupSwagger } from './setup-swagger';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

export async function bootstrap(): Promise<NestExpressApplication> {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
    );
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:56534',
            '192.168.2.101',
            '192.168.1.4',
            '192.168.137.222',
            '192.168.2.100',
            '192.168.11.156',
            '192.168.137.243',
            'https://blended-learning-fe-from-huy-8zxt.vercel.app',
        ],
        methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    });
    //   app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(helmet());
    app.setGlobalPrefix('/v1');
    // app.use(
    //     rateLimit({
    //         windowMs: 15 * 60 * 1000, // 15 minutes
    //         max: 100, // limit each IP to 100 requests per windowMs
    //     }),
    // );
    app.use(compression());
    app.use(
        morgan(':method :url :status :res[content-length] - :response-time ms'),
    );

    app.enableVersioning();

    const reflector = app.get(Reflector);

    app.useGlobalFilters(
        new HttpExceptionFilter(reflector),
        new QueryFailedFilter(reflector),
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: true,
            whitelist: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            transform: true,
            dismissDefaultMessages: true,
            exceptionFactory: (errors) =>
                new UnprocessableEntityException(errors),
        }),
    );

    const configService = app.select(SharedModule).get(ApiConfigService);

    // only start nats if it is enabled
    if (configService.natsEnabled) {
        const natsConfig = configService.natsConfig;
        app.connectMicroservice({
            transport: Transport.NATS,
            options: {
                url: `nats://${natsConfig.host}:${natsConfig.port}`,
                queue: 'main_service',
            },
        });

        await app.startAllMicroservices();
    }

    if (configService.documentationEnabled) {
        setupSwagger(app);
    }

    app.use(expressCtx);

    // Starts listening for shutdown hooks
    if (!configService.isDevelopment) {
        app.enableShutdownHooks();
    }

    const port = configService.appConfig.port;
    await app.listen(port);

    console.info(`server running on ${await app.getUrl()}`);

    return app;
}

void bootstrap();
