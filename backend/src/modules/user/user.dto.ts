import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { MAX_EMAIL_LEN, MAX_PASSWORD_LEN, MAX_USER_NAME_LEN } from "../../utils/global";
import { PreventUnsafe } from "../../decorators/preventUnsafe.decorator";
import { NormalizeEmail } from "class-sanitizer";

export interface User {
    id: string;
}

export class CreateUserDto {
    @IsEmail()
    @NormalizeEmail()
    @MinLength(5, { message: "Should be at least 5 characters."})
    @MaxLength(MAX_EMAIL_LEN, { message: `Should be less than ${MAX_EMAIL_LEN} characters.`})
    email!: string;
    
    @IsString()
    @MinLength(5, { message: "Should be at least 5 characters."})
    @MaxLength(MAX_USER_NAME_LEN, { message: `Should be less than ${MAX_USER_NAME_LEN} characters.`})
    name!: string;

    @IsString()
    @MinLength(5, { message: "Should be at least 5 characters."})
    @MaxLength(MAX_PASSWORD_LEN, { message: `Should be less than ${MAX_PASSWORD_LEN} characters.`})
    password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @PreventUnsafe()
    description?: string;
}

export class SignInDto {
    @IsEmail()
    @NormalizeEmail()
    email!: string;

    @IsString()
    password!: string;
}
