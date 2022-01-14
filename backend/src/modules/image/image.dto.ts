import { IsString } from "class-validator";

export class UploadForumImageDto {
    @IsString()
    forum!: string;
}