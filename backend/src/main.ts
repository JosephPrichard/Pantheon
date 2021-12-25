import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { MikroORM } from 'mikro-orm';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter, InvalidInputExceptionFilter, InvalidSessionExceptionFilter, PermissionsExceptionFilter } from './interceptors/exception.interceptors';
import { ormConfig } from './resource/config';

async function initSchema() {
    const orm = await MikroORM.init(ormConfig);    

    const generator = orm.getSchemaGenerator();
    // await generator.dropSchema();
    // await generator.createSchema();
    await generator.updateSchema();

    await orm.close();
}

async function bootstrap() {

    // await initSchema();

    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(
        new InvalidSessionExceptionFilter(),
        new PermissionsExceptionFilter(),
        new InvalidInputExceptionFilter(),
        new EntityNotFoundExceptionFilter()
    );

    app.setGlobalPrefix("api");
    app.use(cookieParser());

    await app.listen(5000);
}

bootstrap();