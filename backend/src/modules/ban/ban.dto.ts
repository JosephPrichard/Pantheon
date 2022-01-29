import { IsNumber, IsString } from "class-validator";

export class CreateBanDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}

export class DeleteBanDto {
    @IsString()
    forum!: string;

    @IsNumber()
    user!: number;
}