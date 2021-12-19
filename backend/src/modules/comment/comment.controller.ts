import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Request, Response } from "express";
import { sanitize } from "class-sanitizer";
import { sanitizeString } from "../../utils/sanitize";
import { SESSION_ERROR } from "../../utils/global";
import { CreateCommentNodeDto, CreateCommentRootDto, SearchCommentDto, SearchCommentTreeDto, UpdateCommentDto } from "./comment.dto";

@Controller("comments")
export class CommentController {

    constructor(private readonly commentService: CommentService) {}

    @Post("/node")
    async createNode(
        @Body() body: CreateCommentNodeDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        body.content = sanitizeString(body.content);

        const id = await this.commentService.createNode(body, user);
        if (id) {
            res.json({ id });
        } else {
            res.status(405).end();
        }
    }

    @Post("/root")
    async createRoot(
        @Body() body: CreateCommentRootDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        body.content = sanitizeString(body.content);

        const id = await this.commentService.createRoot(body, user);
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
        const comment = await this.commentService.findById(idParam);
        if (comment) {
            res.json({ comment });
        } else {
            res.status(404).end();
        }
    }

    @Get("/search")
    async search(
        @Query() query: SearchCommentDto,
        @Res() res: Response
    ) {
        const comments = await this.commentService.findByFilter(query);
        res.json({ comments: comments });
    }

    @Get("/post")
    async commentSection(
        @Query() query: SearchCommentTreeDto,
        @Res() res: Response
    ) {
        const comments = await this.commentService.findTreesByFilter(query);
        res.json({ comments: comments });
    }

    @Put("/:id")
    async update(
        @Body() body: UpdateCommentDto, 
        @Param("id") idParam: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        sanitize(body);
        body.content = sanitizeString(body.content);

        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const comment = await this.commentService.update({id: idParam, commenter: user }, body);
        if (comment) {
            res.json({ comment });
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

        const comment = await this.commentService.delete({id: idParam, commenter: user });
        if (comment) {
            res.json({ comment });
        } else {
            res.status(404).end();
        }
    }
}
