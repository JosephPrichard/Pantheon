import { Trim } from "class-sanitizer";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { MAX_COMMENT_LEN, SortType } from "../../global";

export class CreateCommentNodeDto {
    @IsNumber()
    parentComment!: number;

    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(1, { message: "Text content cannot be empty."})
    @MaxLength(MAX_COMMENT_LEN, { message: `Text content cannot exceed ${MAX_COMMENT_LEN} characters.`})
    content!: string;
}

export class CreateCommentRootDto {
    @IsNumber()
    post!: number;

    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(1, { message: "Text content cannot be empty."})
    @MaxLength(MAX_COMMENT_LEN, { message: `Text content cannot exceed ${MAX_COMMENT_LEN} characters.`})
    content!: string;
}

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(1, { message: "Text content cannot be empty."})
    @MaxLength(MAX_COMMENT_LEN, { message: `Text content cannot exceed ${MAX_COMMENT_LEN} characters.`})
    content!: string;
}

export interface CommentFilter {
    page: number;
    commenter?: string;
    sort: SortType;
}

export interface CommentTreeFilter {
    page: number;
    post: number;
}
