/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { BadRequestException, Body, Controller, Get, Logger, NotFoundException, Post, Put, Query, Req } from "@nestjs/common";
import { Request } from 'express';
import { UpdateUserDto, CreateUserDto, SignInDto, ResetPasswordDto, } from "./user.dto";
import { UserService } from "./user.service";
import { sanitize } from 'class-sanitizer';
import { InvalidSessionException } from "src/exception/session.exception";
import { SignedInUserRo, SignInRo, SignOutRo, UserIdRo, UserRo } from "./user.interface";

@Controller("users")
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() body: CreateUserDto): Promise<UserIdRo> {
        sanitize(body);

        const nameExists = await this.userService.findUserByName(body.name) !== null;
        if (nameExists) {
            throw new BadRequestException("Username is already in use.");
        }

        const id = await this.userService.create(body);
        return { id };
    }

    @Get("/whoami")
    async getSignedIn(@Req() req: Request): Promise<SignedInUserRo> {
       return { user: req.session?.user };
    }

    @Get()
    async findByUser(@Query("name") name: string): Promise<UserRo> {
        const user = await this.userService.findUserByName(name);
        if (!user) {
            throw new NotFoundException("User not found.");
        }

        return { user };
    }

    @Put()
    async update(@Body() body: UpdateUserDto, @Req() req: Request): Promise<UserIdRo> {

        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const updatedUser = await this.userService.update(body, user);
        const id = updatedUser?.id;
        return { id };
    }

    @Post("/signIn")
    async signIn(@Body() body: SignInDto, @Req() req: Request): Promise<SignInRo> {
        sanitize(body);

        const user = await this.userService.findByLogin(body.name, body.password);
        if (!user) {
            throw new NotFoundException("Incorrect login information.");
        }

        req.session.user = { 
            id: user.id, 
            name: user.name!
        };
        this.logger.log(`User ${user.id} signed in`);
        return { 
            userId: user.id, 
            name: user.name 
        };
    }

    @Post("/signOut")
    async signOut(@Req() req: Request): Promise<SignOutRo> {
        const id = req.session.user?.id;
        req.session.user = undefined;

        if (id) {
            this.logger.log(`User ${id} signed out`);
        }

        return { message: "Successfully logged out" }
    }

    @Post("/resetPassword")
    async resetPassword(@Body() body: ResetPasswordDto, @Req() req: Request): Promise<UserIdRo> {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const id = await this.userService.updatePassword(body, user);
        return { id };
    }
}