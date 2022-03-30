/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ConsoleLogger } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/modules/user/user.dto";

export class AppLogger extends ConsoleLogger {

    exception(req: Request, exception: Error, user?: User) {
        if (user) {
            this.error(`{${req.path}, ${req.method}} ${exception.message} ${req.ip} User ${user.id}`, exception.name);
        } else {
            this.error(`{${req.path}, ${req.method}} ${exception.message} ${req.ip}`, exception.name);
        }
        
    }

}