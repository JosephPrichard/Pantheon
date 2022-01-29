import { IsNumber, IsString } from "class-validator";

export class CreateModeratorDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}

export class DeleteModeratorDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}