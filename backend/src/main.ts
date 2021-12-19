import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { MikroORM } from 'mikro-orm';
import { AppModule } from './app.module';
import { ormConfig } from './resource/config';

async function bootstrap() {

    const orm = await MikroORM.init(ormConfig);    

    const generator = orm.getSchemaGenerator();
    // await generator.dropSchema();
    // await generator.createSchema();
    // await generator.updateSchema();

    await orm.close();

    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(5000);
}

bootstrap();