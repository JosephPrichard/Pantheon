import { IsString } from "class-validator";

export class CreateBanDto {
    @IsString()
    forum!: string;

    @IsString()
    user!: string;
}

export class DeleteBanDto {
    @IsString()
    forum!: string;

    @IsString()
    user!: string;
}