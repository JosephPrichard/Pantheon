import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter, EntityNotFoundExceptionFilter, InvalidInputExceptionFilter, InvalidSessionExceptionFilter, PermissionsExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(
        new InvalidSessionExceptionFilter(),
        new PermissionsExceptionFilter(),
        new InvalidInputExceptionFilter(),
        new EntityNotFoundExceptionFilter(),
        new HttpExceptionFilter()
    );

    app.setGlobalPrefix("api");

    await app.listen(5000);
}

bootstrap();