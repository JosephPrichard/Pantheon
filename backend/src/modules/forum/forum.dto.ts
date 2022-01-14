import { Trim } from "class-sanitizer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { PreventSpaces } from "src/decorators/preventSpaces.decorator";
import { PreventSpecialCharacters } from "src/decorators/preventSpecialCharacters.decorator";
import { MAX_FORUM_DESC_LEN, MAX_FORUM_NAME_LEN, MAX_TITLE_LEN } from "../../utils/global";

export class CreateForumDto {
    @IsString()
    @Trim()
    @PreventSpaces({ message: "Name doesn't allow spaces."})
    @PreventSpecialCharacters({ message: "Name doesn't allow special characters."})
    @MinLength(3, { message: "Name must be at least 3 characters."})
    @MaxLength(MAX_FORUM_NAME_LEN, { message: `Name cannot exceed ${MAX_FORUM_NAME_LEN} characters.`})
    name!: string;
}

export class UpdateForumDto {
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
    @MaxLength(MAX_FORUM_DESC_LEN, { message: `Description cannot exceed ${MAX_FORUM_DESC_LEN} characters.` })
    description?: string;
}