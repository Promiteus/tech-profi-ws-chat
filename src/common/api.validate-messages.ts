import {ValidationArguments} from "class-validator";

export class ApiValidateMessages {
    static stringValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно содержать буквы и/или цифры`;
    };

    static notEmptyValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} не должен быть пустым`;
    };

    static numericValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно быть числом`;
    };

    static inValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно быть во множестве ${args.constraints[0]}`;
    };

    static lengthValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно иметь длину от ${args.constraints[0]} до ${args.constraints[1]}`;
    };

    static isArrayValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} являеся массивом`;
    };

    static isUrlValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно быть в формате url: http://domain.com/file.png`;
    };

    static intValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно содержать только цифры`;
    };

    static dateValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} имеет неверный формат даты (ГГГГ-ММ-ДД)`;
    };

    static emailValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} имеет неверный формат (name@domain.ru)`;
    };

    static phoneValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно иметь ноимер телефона: 79990000000`;
    };

    static booleanValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно быть true или false`;
    };

    static uuidValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно быть в формате UUID`;
    };

    static minValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно иметь минимальное значение: ${args.constraints[0]}`;
    };

    static maxValidationMessage = (args: ValidationArguments): string => {
        return `Поле ${args.property} должно иметь максимальное значение: ${args.constraints[0]}`;
    };

}