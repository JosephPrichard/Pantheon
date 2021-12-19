import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { VoteDto } from "./vote.dto";
import { VoteService } from "./vote.service";
import { Request, Response } from "express";
import { SESSION_ERROR } from "../../utils/global";

@Controller("votes")
export class VoteController {

    constructor(private readonly voteService: VoteService) {}

    @Post("/post")
    async votePost(
        @Body() body: VoteDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const vote = await this.voteService.votePost(body, user);
        if (vote) {
            res.json({ vote });
        } else {
            res.status(405).end();
        }
    }

    @Post("/comment")
    async voteComment(
        @Body() body: VoteDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const vote = await this.voteService.voteComment(body, user);
        if (vote) {
            res.json({ vote });
        } else {
            res.status(405).end();
        }
    }

    @Get("/post/:id")
    async getPostVotes(
        @Param() idParam: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const user = req.session.user;
        if (!user) {
            res.status(401).json({ msg: SESSION_ERROR });
            return;
        }

        const postVote = await this.voteService.findPostVote(idParam, user);
        const commentVotes = await this.voteService.findCommentVotes(idParam, user);

        res.json({ postVote, commentVotes });
    }
}