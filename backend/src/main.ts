/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { NestFactory } from '@nestjs/core';
import { MikroORM } from 'mikro-orm';
import { AppModule } from './app.module';
import { HttpExceptionFilter, EntityNotFoundExceptionFilter, InvalidInputExceptionFilter, InvalidSessionExceptionFilter, PermissionsExceptionFilter } from './filters/exception.filter';
import { ormConfig } from './resource/orm.resource';

// should be used with caution, will destroy entire database and then remake it.
// used for testing.
async function generateSchema() {
    const orm = await MikroORM.init(ormConfig);
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.createSchema();
    await orm.close(true);
}

async function bootstrap() {
    // await generateSchema();

    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(
        new InvalidSessionExceptionFilter(),
        new PermissionsExceptionFilter(),
        new InvalidInputExceptionFilter(),
        new EntityNotFoundExceptionFilter(),
        new HttpExceptionFilter()
    );

    app.setGlobalPrefix("api");

    app.enableCors({ credentials: true, origin: true });

    await app.listen(5000);
}

bootstrap();