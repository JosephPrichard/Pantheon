/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ConsoleLogger } from "@nestjs/common";
import { Request } from "express";
import { User } from "../modules/user/user.interface";

export class AppLogger extends ConsoleLogger {

    exception(req: Request, exception: Error, user?: User) {
        const str = `{${req.path}, ${req.method}} ${exception.message} ${req.ip}`;
        if (user) {
            this.error(`{${str} User ${user.id}`, exception.name);
        } else {
            this.error(`{${str}`, exception.name);
        }
    }

}