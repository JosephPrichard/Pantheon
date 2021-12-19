import { Body, Controller, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { CreateCircleDto, UpdateCircleDto } from "./circle.dto";
import { CircleService } from "./circle.service";
import { Request, Response } from "express";
import { SESSION_ERROR } from "src/utils/global";
import { sanitize } from "class-sanitizer";
import { sanitizeString } from "src/utils/sanitize";

@Controller("circles")
export class CircleController {

    constructor(private readonly circleService: CircleService) {}
    
    @Post()
    async create(
        @Body() body: CreateCircleDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const id = await this.circleService.create(body, user);
        res.json({ id });
    }

    @Get("/:id")
    async getById(
        @Param("id") idParam: string,
        @Res() res: Response
    ) {
        const circle = await this.circleService.findById(idParam);
        if (circle) {
            res.json({ circle });
        } else {
            res.status(404).end();
        }
    }

    @Put("/:id")
    async update(
        @Body() body: UpdateCircleDto,
        @Param("id") idParam: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        sanitize(body);
        if (body.description) {
            body.description = sanitizeString(body.description);
        }

        const circle = await this.circleService.update({id: idParam, user }, body);
        if (circle) {
            res.json({ circle });
        } else {
            res.status(404).end();
        }
    }
}