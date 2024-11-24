import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import {ApiValidateMessages} from "../../common/api.validate-messages";

export class UserChatDto {
    @IsUUID('all', {message: ApiValidateMessages.uuidValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    userId: string;
    page: number = 0;
    size: number = 20;
}