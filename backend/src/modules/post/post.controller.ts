import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from "@nestjs/common";
import { sanitize } from "class-sanitizer";
import { CreatePostDto, UpdatePostDto } from "./post.dto";
import { PostService } from "./post.service";
import { Request, Response } from "express";
import { SESSION_ERROR, TimeType } from "../../utils/global";
import { sanitizeString } from "../../utils/sanitize";
import { PostVoteEntity } from "../vote/vote.entity";

@Controller("posts")
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Post()
    async create(
        @Body() body: CreatePostDto, 
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        sanitize(body);
        if (body.content) {
            body.content = sanitizeString(body.content);
        }

        const id = await this.postService.create(body, user);
        if (id) {
            res.json({ id });
        } else {
            res.status(405).end();
        }
    }

    @Get("/:id")
    async getById(
        @Param("id") idParam: string,
        @Res() res: Response
    ) {
        const post = await this.postService.findById(idParam);
        if (post) {
            res.json({ post });
        } else {
            res.status(404).end();
        }
    }

    @Put("/:id")
    async update(
        @Body() body: UpdatePostDto, 
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
        if (body.content) {
            body.content = sanitizeString(body.content);
        }

        const post = await this.postService.update({id: idParam, poster: user }, body);
        if (post) {
            res.json({ post });
        } else {
            res.status(404).end();
        }
    }

    @Delete("/:id")
    async delete(
        @Param("id") idParam: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const post = await this.postService.delete({id: idParam, poster: user });
        if (post) {
            res.json({ post });
        } else {
            res.status(404).end();
        }
    }
}