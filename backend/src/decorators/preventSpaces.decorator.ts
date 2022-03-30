/*
 * Copyright (c) Joseph Prichard 2022.
 */

import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";

export function PreventSpaces(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: PreventSpacesClass,
        });
    };
}


@ValidatorConstraint({name: "Custom" })
export class PreventSpacesClass implements ValidatorConstraintInterface {

    async validate(value: any) {
        const reWhiteSpace = new RegExp("/^\s+$/");
        return !reWhiteSpace.test(value);
    }
    
}