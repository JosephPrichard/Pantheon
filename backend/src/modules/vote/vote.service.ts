import { PostEntity } from "../post/post.entity";
import { UserEntity } from "../user/user.entity";
import { CommentVoteEntity, PostVoteEntity } from "./vote.entity";
import { VoteDto } from "./vote.dto";
import { CommentService } from "../comment/comment.service";
import { PostService } from "../post/post.service";
import { Dependencies, Injectable } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "mikro-orm";
import { User } from "../user/user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class VoteService {

    constructor(
        @InjectRepository(CommentVoteEntity) 
        private readonly commentVoteRepository: EntityRepository<CommentVoteEntity>,

        @InjectRepository(PostVoteEntity) 
        private readonly postVoteRepository: EntityRepository<PostVoteEntity>,

        private readonly userService: UserService,

        private readonly postService: PostService,

        private readonly commentService: CommentService
    ) {}

    async votePost(newVote: VoteDto, voter: User) {
        const post = await this.postService.findById(newVote.resource);
        if (post) {
            const voteEntity = await this.postVoteRepository.findOne({ post: newVote.resource, voter: voter.id });
            
            // check if vote entity already exists in database
            if (voteEntity) {
                // if so, we need to update the vote entity's value
                post.votes += newVote.value - voteEntity.value;

                voteEntity.value = newVote.value;

                this.postVoteRepository.flush();
    
                return voteEntity;
            } else {
                // otherwise we create a new vote entity and persist it
                post.votes += newVote.value;

                const voteEntity = new PostVoteEntity();   
                voteEntity.post = post;
                voteEntity.voter = this.userService.getEntityReference(voter.id);
                voteEntity.value = newVote.value;

                this.postVoteRepository.persistAndFlush(voteEntity);

                return voteEntity;
            }
        }
    }

    async voteComment(newVote: VoteDto, voter: User) {
        const comment = await this.commentService.findById(newVote.resource);
        if (comment) {
            const voteEntity = await this.commentVoteRepository.findOne({ comment: newVote.resource, voter: voter.id });
            
            // check if vote entity already exists in database
            if (voteEntity) {
                // if so, we need to update the vote entity's value
                comment.votes += newVote.value - voteEntity.value;

                voteEntity.value = newVote.value;

                this.commentVoteRepository.flush();
    
                return voteEntity;
            } else {
                // otherwise we create a new vote entity and persist it
                comment.votes += newVote.value;

                const voteEntity = new CommentVoteEntity();   
                voteEntity.comment = comment;
                voteEntity.voter = this.userService.getEntityReference(voter.id);
                voteEntity.value = newVote.value;
                voteEntity.post = comment.post;

                this.commentVoteRepository.persistAndFlush(voteEntity);

                return voteEntity;
            }
        }
    }

    async findPostVote(postId: string, voter: User) {
        return await this.postVoteRepository.find({ voter: voter.id, post: postId });
    }

    async findPostVotes(posts: PostEntity[], voter: User) {
        return await this.postVoteRepository.find({ voter: voter.id, post: { $in: posts } });
    }

    async findCommentVotes(postId: string, voter: User) {
        return await this.commentVoteRepository.find({ voter: voter.id, post: postId });
    }
}