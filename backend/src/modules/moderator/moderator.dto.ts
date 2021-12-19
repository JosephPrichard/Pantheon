import { IsString } from "class-validator";

export class CreateModeratorDto {
    @IsString()
    circle!: string;

    @IsString()
    user!: string;
}

export class DeleteModeratorDto {
    @IsString()
    circle!: string;

    @IsString()
    user!: string;
}