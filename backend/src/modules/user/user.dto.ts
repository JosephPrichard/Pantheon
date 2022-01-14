import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { MAX_EMAIL_LEN, MAX_PASSWORD_LEN, MAX_USER_NAME_LEN } from "../../utils/global";
import { PreventUnsafe } from "../../decorators/preventUnsafe.decorator";
import { NormalizeEmail } from "class-sanitizer";
import { PreventSpaces } from "src/decorators/preventSpaces.decorator";
import { PreventSpecialCharacters } from "src/decorators/preventSpecialCharacters.decorator";

export interface User {
    id: string;
}

export class CreateUserDto {
    @IsEmail()
    @NormalizeEmail()
    @MinLength(5, { message: "Email should be at least 5 characters." })
    @MaxLength(MAX_EMAIL_LEN, { message: `Email should be less than ${MAX_EMAIL_LEN} characters.`})
    email!: string;
    
    @IsString()
    @PreventSpaces({ message: "Username doesn't allow spaces."})
    @PreventSpecialCharacters({ message: "Username doesn't allow special characters."})
    @MinLength(5, { message: "Username should be at least 5 characters."})
    @MaxLength(MAX_USER_NAME_LEN, { message: `Username should be less than ${MAX_USER_NAME_LEN} characters.`})
    name!: string;

    @IsString()
    @MinLength(5, { message: "Password sould be at least 5 characters."})
    @MaxLength(MAX_PASSWORD_LEN, { message: `Password should be less than ${MAX_PASSWORD_LEN} characters.`})
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
