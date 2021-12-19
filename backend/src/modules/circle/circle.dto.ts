import { Trim } from "class-sanitizer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { MAX_CIRCLE_DESC_LEN, MAX_CIRCLE_NAME_LEN, MAX_TITLE_LEN } from "../../utils/global";
import { User } from "../user/user.dto";

export class CreateCircleDto {
    @IsString()
    @Trim()
    @MinLength(3, { message: "Name must be at least 3 characters."})
    @MaxLength(MAX_CIRCLE_NAME_LEN, { message: `Name cannot exceed ${MAX_CIRCLE_NAME_LEN} characters.`})
    name!: string;
}

export class UpdateCircleDto {
    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(3, { message: "Title must be at least 3 characters."})
    @MaxLength(MAX_TITLE_LEN, { message: `Title cannot exceed ${MAX_TITLE_LEN} characters.`})
    title?: string;

    @IsOptional()
    @IsString()
    @Trim()
    @MinLength(1, { message: "Description cannot be empty."})
    @MaxLength(MAX_CIRCLE_DESC_LEN, { message: `Description cannot exceed ${MAX_CIRCLE_DESC_LEN} characters.`})
    description?: string;

    @IsOptional()
    @IsString()
    image?: string;
}

export interface IdAndUserQuery {
    id: string;
    user: User;
}