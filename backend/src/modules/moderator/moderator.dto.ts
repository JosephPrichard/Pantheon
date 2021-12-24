import { IsString } from "class-validator";

export class CreateModeratorDto {
    @IsString()
    forum!: string;

    @IsString()
    user!: string;
}

export class DeleteModeratorDto {
    @IsString()
    forum!: string;

    @IsString()
    user!: string;
}