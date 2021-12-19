import { IsBoolean, IsString } from "class-validator";

export class CreateSubDto {
    @IsString()
    circle!: string;
}

export class UpdateSubDto {
    @IsString()
    circle!: string;

    @IsBoolean()
    isFavorite!: boolean;
}

export class DeleteSubDto {
    @IsString()
    circle!: string;
}