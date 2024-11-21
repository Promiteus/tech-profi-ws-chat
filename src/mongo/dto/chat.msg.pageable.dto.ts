import {IsInt, IsNotEmpty, IsString, Min} from "class-validator";
import {ApiValidateMessages} from "../../common/api.validate-messages";

export class ChatMsgPageableDto {
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    fromUserId: string;
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    userId: string;
    @IsInt({message: ApiValidateMessages.intValidationMessage})
    @Min(0, {
        message: ApiValidateMessages.minValidationMessage,
    })
    page: number;
    @IsInt({message: ApiValidateMessages.intValidationMessage})
    @Min(10, {
        message: ApiValidateMessages.minValidationMessage,
    })
    size: number;
}