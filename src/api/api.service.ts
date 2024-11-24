import { Injectable } from '@nestjs/common';
import {MongoChatMsgService} from "../mongo/mongo.chat.msg.service";
import {ChatMsgPageableDto} from "../mongo/dto/chat.msg.pageable.dto";
import {UserChatDto} from "../mongo/dto/user.chat.dto";

@Injectable()
export class ApiService {
    constructor(private readonly mongoService: MongoChatMsgService) {
    }

    /**
     * Вернуть переписку с пользователем постранично
     * @param dto ChatMsgPageableDto
     */
    async getChatMessagesByPages(dto: ChatMsgPageableDto) {
        return await this.mongoService.getByPages(dto);
    }

    /**
     * Удалить выбранное сообщение
     * @param id string
     */
    async deleteChatMessage(id: string) {
        return await this.mongoService.delete(id);
    }

    /**
     * Получить список чатов пользователя
     * @param dto UserChatDto
     */
    async getUserChatsByPages(dto: UserChatDto) {
        return await this.mongoService.getChatsByPages(dto);
    }
}
