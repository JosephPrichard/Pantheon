import { Body, Controller, Post, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { SESSION_ERROR } from "../../utils/global";
import { UpdateUserDto, CreateUserDto, SignInDto } from "./user.dto";
import { UserService } from "./user.service";
import { sanitize } from 'class-sanitizer';

@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(
        @Body() body: CreateUserDto, 
        @Res() res: Response
    ) {

        sanitize(body);

        const emailExists = await this.userService.findCredsByEmail(body.email) !== null;
        const nameExists = await this.userService.findUserByName(body.name) !== null;

        if (emailExists) {
            return emailAddrInUse();
        }
        if (nameExists) {
            return userNameInUse();
        }

        const id = await this.userService.create(body);
        if(id) {
            res.json({ id: id });
        } else {
            res.status(405).end();
        } 
    }

    @Put()
    async update(
        @Body() body: UpdateUserDto, 
        @Req() req: Request, 
        @Res() res: Response
    ) {

        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const updatedUser = await this.userService.update(user, body);
        const id = updatedUser?.id;
        res.json({ id: id });
    }

    @Post("/signIn")
    async signIn(
        @Body() body: SignInDto, 
        @Req() req: Request, 
        @Res() res: Response
    ) {
        const user = await this.userService.findByLogin(body.email, body.password);
        if (user) {
            req.session.user = { id: user.id };
            res.json({ userId: user.id, name: user.name });
        } else {
            res.status(404).json({ msg: "Incorrect login information." });
        }
    }

    @Post("/signOut")
    async signOut(
        @Req() req: Request, 
        @Res() res: Response
    ) {
        req.session.user = undefined;
        res.status(200).end();
    }

}

function emailAddrInUse() {
    return {
        id: undefined,
        errors: [
            {
                param: "email",
                msg: "Email address is already in use"
            }
        ]
    }
}

function userNameInUse() {
    return {
        id: undefined,
        errors: [
            {
                param: "name",
                msg: "User name is already in use"
            }
        ]
    }
}