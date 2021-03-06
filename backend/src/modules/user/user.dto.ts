/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { MAX_PASSWORD_LEN, MAX_USER_NAME_LEN } from "../../global";
import { PreventSpaces } from "src/decorators/preventSpaces.decorator";
import { PreventSpecialCharacters } from "src/decorators/preventSpecialCharacters.decorator";

export class CreateUserDto {
    @IsString()
    @PreventSpaces({ message: "Username doesn't allow spaces."})
    @PreventSpecialCharacters({ message: "Username doesn't allow special characters."})
    @MinLength(5, { message: "Username should be at least 5 characters."})
    @MaxLength(MAX_USER_NAME_LEN, { message: `Username should be less than ${MAX_USER_NAME_LEN} characters.`})
    name!: string;

    @IsString()
    @MinLength(5, { message: "Password should be at least 5 characters."})
    @MaxLength(MAX_PASSWORD_LEN, { message: `Password should be less than ${MAX_PASSWORD_LEN} characters.`})
    password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    description?: string;
}

export class SignInDto {
    @IsString()
    name!: string;

    @IsString()
    password!: string;
}

export class ResetPasswordDto {
    @IsString()
    password!: string;

    @IsString()
    newPassword!: string;
}