import { Injectable } from '@nestjs/common';
import {MongoService} from "../mongo/mongo.service";
import {ChatMsgPageableDto} from "../mongo/dto/chat.msg.pageable.dto";

@Injectable()
export class ApiService {
    constructor(private readonly mongoService: MongoService) {
    }

    /**
     * Вернуть переписку с пользователем постранично
     * @param dto ChatMsgPageableDto
     */
    async getChatMessagesByPages(dto: ChatMsgPageableDto) {
        return await this.mongoService.getByPages(dto);
    }

}
