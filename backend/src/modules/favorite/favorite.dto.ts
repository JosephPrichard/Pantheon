import { IsNumber } from "class-validator";

export class CreateFavoriteDto {
    @IsNumber()
    post!: number;
}