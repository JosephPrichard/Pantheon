/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";

export function PreventUnsafe(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: PreventUnsafeClass,
        });
    };
}


@ValidatorConstraint({name: "Custom" })
export class PreventUnsafeClass implements ValidatorConstraintInterface {

    async validate(value: any) {
        return /[<>]/.test(value);
    }
    
}