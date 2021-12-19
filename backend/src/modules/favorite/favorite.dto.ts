import { IsString } from "class-validator";

export class CreateFavoriteDto {
    @IsString()
    post!: string;
}