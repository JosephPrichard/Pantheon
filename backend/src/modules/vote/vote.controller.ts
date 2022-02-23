import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { VoteDto } from "./vote.dto";
import { VoteService } from "./vote.service";
import { Request } from "express";
import { InvalidSessionException } from "src/exception/session.exception";

@Controller("votes")
export class VoteController {

    constructor(private readonly voteService: VoteService) {}

    @Post("/post")
    async votePost(
        @Body() body: VoteDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const vote = await this.voteService.votePost(body, user);
        return { vote };
    }

    @Post("/comment")
    async voteComment(
        @Body() body: VoteDto,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const vote = await this.voteService.voteComment(body, user);
        return { vote };
    }

    @Get("/post/:id")
    async getPostVotes(
        @Param() idParam: number,
        @Req() req: Request
    ) {
        const user = req.session.user;
        if (!user) {
            throw new InvalidSessionException();
        }

        const postVote = await this.voteService.findPostVote(idParam, user);
        const commentVotes = await this.voteService.findCommentVotes(idParam, user);

        return { postVote, commentVotes };
    }
}