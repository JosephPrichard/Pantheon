import { Type } from "class-transformer";
import { IsOptional, IsString, IsIn, IsInt } from "class-validator";
import { SortType, TimeType } from "src/utils/global";

export class FeedPostDto {
    @IsOptional()
    @IsString()
    @IsIn(["day", "week", "month", "year", "alltime"])
    time?: TimeType;

    @IsInt()
    @Type(() => Number)
    page!: number;

    @IsOptional()
    @IsString()
    poster?: string;

    @IsOptional()
    @IsString()
    forum?: string;

    @IsString()
    @IsIn(["new", "top"])
    sort!: SortType;
}

export class FeedCommentDto {
    @IsInt()
    @Type(() => Number)
    page!: number;

    @IsOptional()
    @IsString()
    commenter?: string;

    @IsString()
    @IsIn(["new", "top"])
    sort!: SortType;
}


export class FeedCommentTreeDto {
    @IsInt()
    @Type(() => Number)
    page!: number;

    @IsString()
    @IsIn(["new", "top"])
    sort!: SortType;
}