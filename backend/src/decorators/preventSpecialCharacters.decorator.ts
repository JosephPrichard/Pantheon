import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";

export function PreventSpecialCharacters(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: PreventSpecialCharactersClass,
        });
    };
}


@ValidatorConstraint({name: "Custom" })
export class PreventSpecialCharactersClass implements ValidatorConstraintInterface {

    async validate(value: any) {
        return !hasSpecialChars(value);
    }
    
}

function hasSpecialChars(str: string) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}