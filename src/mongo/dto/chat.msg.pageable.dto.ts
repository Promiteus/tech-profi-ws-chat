import {IsInt, Min} from "class-validator";
import {ApiValidateMessages} from "../../common/api.validate-messages";

export class ChatMsgPageableDto {
    fromUserId: string;
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