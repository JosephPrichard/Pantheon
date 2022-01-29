import { IsIn, IsInt, IsNumber } from "class-validator";

export class VoteDto {
    @IsNumber()
    resource!: number;

    @IsInt()
    @IsIn([-1, 0, 1])
    value!: -1 | 0 | 1;
}