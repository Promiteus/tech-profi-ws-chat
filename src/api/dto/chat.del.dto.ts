import {IsNotEmpty, IsUUID} from "class-validator";
import {ApiValidateMessages} from "../../common/api.validate-messages";

export class ChatDelDto {
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    id: string;
    @IsUUID('all', {message: ApiValidateMessages.uuidValidationMessage})
    @IsNotEmpty({message: ApiValidateMessages.notEmptyValidationMessage})
    fromUserId: string;
}