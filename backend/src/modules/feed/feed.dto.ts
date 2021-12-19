import { IsOptional, IsString, IsIn, IsInt } from "class-validator";
import { SortType, TimeType } from "src/utils/global";

export class FeedPostDto {
    @IsOptional()
    @IsString()
    @IsIn(["day", "week", "month", "year", "alltime"])
    time?: TimeType;

    @IsInt()
    page!: number;

    @IsOptional()
    @IsString()
    poster?: string;

    @IsString()
    @IsIn(["new", "top"])
    sort!: SortType;
}