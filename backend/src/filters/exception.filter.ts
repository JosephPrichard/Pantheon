/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
import { Catch } from "@nestjs/common/decorators/core/catch.decorator";
import { EntityNotFoundException } from "../exception/entityNotFound.exception";
import { InvalidInputException } from "../exception/invalidInput.exception";
import { InvalidSessionException } from "../exception/session.exception";
import { Request, Response } from 'express';
import { AppLogger } from "src/loggers/applogger";
import { PermissionsException } from "../exception/permissions.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new AppLogger();

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        this.logger.exception(request, exception, request.session.user);

        response
            .status(exception.getStatus())
            .json(exception.getResponse());
    }
}

@Catch(InvalidSessionException)
export class InvalidSessionExceptionFilter implements ExceptionFilter {

    private readonly logger = new AppLogger();

    catch(exception: InvalidSessionException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        this.logger.exception(request, exception, request.session.user);

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

    private readonly logger = new AppLogger();

    catch(exception: PermissionsException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        this.logger.exception(request, exception, request.session.user);

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

    private readonly logger = new AppLogger();

    catch(exception: InvalidInputException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        this.logger.exception(request, exception, request.session.user);

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

    private readonly logger = new AppLogger();

    catch(exception: EntityNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        this.logger.exception(request, exception, request.session.user);

        response
            .status(404)
            .json({
                statusCode: 404,
                message: exception.message,
                error: "Not Found"
            });
    }
}