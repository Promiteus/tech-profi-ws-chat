import {IsNotEmpty, IsString, Length} from "class-validator";
import {ApiValidateMessages} from "../../common/api.validate-messages";

export class ChatMessageDto {
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    userId: string;
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    fromUserId: string;
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    @Length(1,3000, {message: ApiValidateMessages.lengthValidationMessage})
    message: string;
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    room: string;
}