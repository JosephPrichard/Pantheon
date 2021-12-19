import { IsIn, IsInt, IsString } from "class-validator";

export class VoteDto {
    @IsString()
    resource!: string;

    @IsInt()
    @IsIn([-1, 0, 1])
    value!: -1 | 0 | 1;
}