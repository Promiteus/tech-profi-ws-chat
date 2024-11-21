import {IsInt, IsNotEmpty, isNumber, IsString, Min} from "class-validator";
import {ApiValidateMessages} from "../../common/api.validate-messages";

export class ChatMsgPageableDto {
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    fromUserId: string;
    @IsString({message: ApiValidateMessages.stringValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    userId: string;
    page: number = 0;
    size: number = 20;
}