import { Escape, Trim } from "class-sanitizer";
import { IsArray, IsIn, IsInt, IsOptional, IsString, IsUrl, MaxLength, MinLength, ValidateNested } from "class-validator";
import { MAX_LINK_LEN, MAX_POST_LEN, MAX_TITLE_LEN, SortType, TimeType } from "../../utils/global";
import { User } from "../user/user.dto";
import { PostEntity } from "./post.entity";

export class CreatePostDto {
    @IsString()
    @Trim()
    @MinLength(5, { message: "Title should be at least 5 characters."})
    @MaxLength(MAX_TITLE_LEN, { message: `Title should be less than ${MAX_TITLE_LEN} characters.`})
    title!: string;

    @IsString()
    circle!: string;

    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(1, { message: "Text content cannot be empty."})
    @MaxLength(MAX_POST_LEN, { message: `Text content cannot exceed ${MAX_POST_LEN} characters.`})
    content?: string;

    @IsOptional()
    @IsString()
    @Trim()
    @IsUrl()
    @MaxLength(MAX_LINK_LEN, { message: `Link should be less than ${MAX_LINK_LEN} characters.`})
    link?: string;

    @IsOptional()
    @IsString({each: true})
    images?: string[];
}

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(1, { message: "Text content cannot be empty."})
    @MaxLength(MAX_POST_LEN, { message: `Text content cannot exceed ${MAX_POST_LEN} characters.`})
    content?: string;
    
    @IsOptional()
    @IsString()
    @Trim()
    @IsUrl()
    @MaxLength(MAX_LINK_LEN, { message: `Link should be less than ${MAX_LINK_LEN} characters.`})
    link?: string;

    @IsOptional()
    @IsString({each: true})
    images?: string[];
}

export interface PostFilter {
    poster?: string;
    date?: Date;
    sort: SortType;
    page: number;
}

export interface IdAndPosterQuery {
    id: string;
    poster: User;
}

export type SearchRes = {
    posts: PostEntity[];
    pageCount: number;
}
