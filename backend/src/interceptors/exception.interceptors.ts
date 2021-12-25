import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Catch } from "@nestjs/common/decorators/core/catch.decorator";
import { EntityNotFoundException } from "../exception/entityNotFound.exception";
import { InvalidInputException } from "../exception/invalidInput.exception";
import { PermissionsException } from "../exception/permissions.exception";
import { InvalidSessionException } from "../exception/session.exception";
import { Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(InvalidSessionException)
export class InvalidSessionExceptionFilter implements ExceptionFilter {

    catch(exception: InvalidSessionException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        Logger.error(exception.name, exception.message);

        response
            .status(401)
            .json({
                statusCode: 401,
                message: exception.message,
                error: "Unauthorized"
            });
    }
}

@Catch(PermissionsException)
export class PermissionsExceptionFilter implements ExceptionFilter {

    catch(exception: PermissionsException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        Logger.error(exception.name, exception.message);

        response
            .status(401)
            .json({
                statusCode: 401,
                message: exception.message,
                error: "Unauthorized"
            });
    }
}

@Catch(InvalidInputException)
export class InvalidInputExceptionFilter implements ExceptionFilter {

    catch(exception: InvalidInputException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        Logger.error(exception.name, exception.message);

        response
            .status(400)
            .json({
                statusCode: 400,
                message: exception.message,
                error: "Bad Request"
            });
    }
}

@Catch(EntityNotFoundException)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

    catch(exception: EntityNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        Logger.error(exception.name, exception.message);

        response
            .status(404)
            .json({
                statusCode: 404,
                message: exception.message,
                error: "Not Found"
            });
    }
}